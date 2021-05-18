import mongoose from 'mongoose';

const checkObjectId = (id) => (req, res, next) => {
      // check if id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
        res.status(404);
        throw new Error('Resource Not Found');
      }
      next();
};

export default checkObjectId;