/* 
------Serializer------
serialize documents to an objects in js to get a pure object
without not wanted properties that mangoose is add to the document 
*/
const _serializeSingle = (driver) => {
  return {
    'id': driver._id,
    'firstName': driver.firstName,
    'lastName': driver.lastName,
    'vehicle' : driver.vehicle,
    'orders': driver.orders,
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
