import { Router, Request, Response, NextFunction} from 'express';


function userErrorsHandler (err: Error, req: Request, res: Response, next: NextFunction){
    if(req.xhr){
        res.status(500).send({"Skidt er sket": err})
    }
    else
    next(err)
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    res.status(500)
    res.render('error', {error: err})
}

module.exports = errorHandler;