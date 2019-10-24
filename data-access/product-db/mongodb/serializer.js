/* 
------Serializer------
serialize documents to an objects in js to get a pure object
without not wanted properties that mangoose is add to the document 
*/
const _serializeSingle = (product) => {
  return {
    'id': product._id,
    'name': product.name,
    'description': product.description,
    'price': product.price,
    'category': product.category
  };
};

const serializer = async(data) => {
  if (!data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
}

module.exports = serializer;
