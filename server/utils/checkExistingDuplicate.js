
const checkExistingDuplicate = async (model, fieldname, fieldvalue) => {
  const caseInsensitiveRegex = new RegExp(`^${fieldvalue}$`, 'i')
  const exists = await model.exists({ [fieldname]: { $regex: caseInsensitiveRegex } })
  return exists
}


//Alternative version

/*const checkExistingDuplicate = async (Model, fieldname, fieldValue) => {
  const caseInsensitiveRegex = new RegExp(`^${fieldValue}$`, 'i');
  const query = {}
  query[fieldname] = { $regex: caseInsensitiveRegex }
  const exist = await Model.exists(query);
  return await exist
};*/


module.exports = { checkExistingDuplicate }