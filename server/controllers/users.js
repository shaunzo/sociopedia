import User from "../models/User.js";
import bcrypt from 'bcrypt';

// READ
export const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

// UPDATE
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, location, occupation } = req.body;
        const user = await User.findById(id);

        user.firstName = firstName;
        user.lastName= lastName;
        user.email = email;
        user.location = location;
        user.occupation = occupation;

        await user.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({message: `${err.message} - ${JSON.stringify(req.params)}`});
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, password } = req.body;
        const user = await User.findById(id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch) return res.status(400).json({msg: "Old password does not match"});

        const salt = await bcrypt.genSalt();
        const updatedPasswordHash = await bcrypt.hash(password, salt);

        user.password = updatedPasswordHash;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(404).json({message: `${err.message} - ${JSON.stringify(req.params)}`});
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id );
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}