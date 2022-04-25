module.exports.mongooseParser = {
  toJSON: {
    transform(doc, ret) {
      (ret.id = ret._id), delete ret._id;
      delete password;
      delete ret.__v;
    },
  },
};
