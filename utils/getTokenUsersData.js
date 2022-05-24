const getTokenUserData = (user) => {
    return { name: user.name, userID: user._id };
};

export default getTokenUserData;