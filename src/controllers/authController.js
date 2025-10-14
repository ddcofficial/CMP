const admin = require('firebase-admin');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      createdAt: new Date().toISOString(),
    });

    res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    // You can add additional checks here, like checking if the user exists in your Firestore database.
    res.status(200).send({ message: 'Login successful', uid });
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized: ' + error.message });
  }
};