import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res, role = 'user') => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: 'strict',
    });

    return token;
};

export default generateTokenAndSetCookie;