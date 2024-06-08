import User from '../models/user.mjs';
import bcrypt from 'bcrypt';
import { createToken, setCookie, isEmpty, id } from '../utils/utils.mjs';
import { uploadPhoto } from '../utils/cloudinary.mjs';

export const findByEmail = async (email) => {
  try {
    const emailName = email?.name;
    const domain = email?.domain;
    const foundUser = await User.findOne({
      $and: [
        { 'email.name': emailName },
        { 'email.domain': domain }
      ]
    }).exec();
    return foundUser;
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export const register = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await User.create(req.body);
    setCookie(res, createToken({ email : req.body.email }));
    return res.status(201).json(newUser);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export const login = async (req, res) => {
  try {
    const message = 'Invalid username, email or password!';
    const { user, password } = req.body;

    if (!user || !password) 
      return res.status(406).send(message);

    let foundUser;

    if (user.includes('@'))
      foundUser = await findByEmail({ 
        name: user.split('@')[0], 
        domain: user.split('@')[1] 
      }).exec();
    else foundUser = await User.findOne({ username: user }).exec();
    
    if (!foundUser) return res.status(404)
      .send('Invalid username, email or password!');
    
    const compared = await bcrypt.compare(password, foundUser.password);
    if (!compared) return res.status(401).send(message);

    const token = createToken({ email : foundUser.email });
    setCookie(res, token);

    return res.status(200).json(foundUser);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
}

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly : true,
      expires : new Date()
    });
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export const updateOne = async (req, res) => {
  try {
    if ( isEmpty(req.body) ) return res.status(400)
      .send('There is no prop to update!');

      if ('password' in req.body && req.body.password.length > 0)
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    else delete req.body.password;

    let foundUser = await User.findByIdAndUpdate(req.params.id, req.body).exec();
    if (!foundUser) return res.status(404)
      .send('There is no such user!');

    for (const k in req.body)
      foundUser[k] = req.body[k];
    foundUser = await foundUser.save().exec();

    return res.status(200).json(foundUser);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export const getOne = async (req, res) => {
  try {
    const foundUser = await User.findById(id).exec();
    if (!foundUser) return res.status(404)
      .send('There no such user!');
    return res.status(200).json(foundUser);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export const deleteOne = async (req, res) => {
  try {

    const foundUser = await User.findById(id).exec();
    if (!foundUser) return res.status(404)
      .send('There no such user!');
    await User.findByIdAndDelete(id);
    return res.status(200)
      .send(`User with ID : ${id} has been deleted!`);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}