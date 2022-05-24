import jwt from 'jsonwebtoken';

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);
//P@ssw0rd123

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME, //1hr        
    });
    return token;
};

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
};

export { isTokenValid, attachCookiesToResponse };