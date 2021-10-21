// import { Products } from '../product/entities/products.entity'

export class uploadservice {
    static customFileName(req, file, cb) {    
      cb(null, req.headers.filename);
    }
   
    static destinationPath(req, file, cb) {
      cb(null, './data/images/item')
    }

  }

