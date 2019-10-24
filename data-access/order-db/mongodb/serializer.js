/* 
------Serializer------
serialize documents to an objects in js to get a pure object
without not wanted properties that mangoose is add to the document 
*/
const _serializeSingle = (order) => {
  return {
    'id': order._id,
    'userId': order.userId  ,
    'quantity': order.quantity  ,
    'date': order.date  ,
    'totalPrice': order.totalPrice  ,
    'location' : order.location,
    'contactInformation':order.contactInformation,
    'products' : order.products
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
