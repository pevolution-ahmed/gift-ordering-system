/* 
------Serializer------
serialize documents to an objects in js to get a pure object
without unwanted properties that mangoose added to the document
[ like using lodash pick() function ]
*/
const _serializeSingle = (user) => {
  return {
    'id': user._id,
    'firstName': user.firstName,
    'lastName': user.lastName,
    'email': user.email,
    'password': user.password,
    'gender': user.gender,
    'birthday': user.birthday,
    'address' : user.address
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
