module.exports = function(app, Archive)
{
    // GET ALL ARCHIVES
    app.get('/api/archives', function(req,res){
        var query = {};
        if( req.query.type != undefined ) {
            query["type"] = req.query.type
        }

        if( req.query.title != undefined) {
            query["title"] = {$regex: '.*' + req.query.title + '.*'};
        }

        var options = {
            sort: req.query.sort == undefined ? {date: -1} : JSON.parse(req.query.sort),
            offset: req.query.offset == undefined ? 0 : Number(req.query.offset),
            limit: req.query.limit == undefined ? 20 : Number(req.query.limit),
        }

        Archive.paginate(query, options).then(function(result){
            res.json(result);
        });
    });

    // GET SINGLE ARCHIVE
    app.get('/api/archives/:_id', function(req, res){
        Archive.findOne({_id: req.params._id}, function(err, archive){
            if(err) return res.status(500).json({error: err});
            if(!archive) return res.status(404).json({error: 'archive not found'});
            res.json(archive);
        })
    });

    // CREATE ARCHIVE
    app.post('/api/archives', function(req, res){
        var archive = new Archive();
        archive.title = req.body.title;
        archive.type = req.body.type;
        archive.link = req.body.link;
        archive.count = req.body.count;
        archive.date = new Date(req.body.date);

        archive.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});
        });
    });

    // UPDATE THE ARCHIVE
    app.put('/api/archives/:_id', function(req, res){
        Archive.update({ _id: req.params._id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'archive not found' });
            res.json( { message: 'archive updated' } );
        })
    });

    // DELETE ARCHIVE
    app.delete('/api/archives/:_id', function(req, res){
        Archive.remove({ _id: req.params._id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "archive not found" });
            res.json({ message: "archive deleted" });
            */

            res.status(204).end();
        })
    });
     
}
