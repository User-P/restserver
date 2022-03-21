const isAdmin = (req, res, next) => {
    if (!req.user) return res.status(500).send({ message: 'Token not validated' });
    if (req.user.role !== 'admin')
        return res.status(401).json({ msg: 'You are not authorized' });
    next();

}

const hasRole = (...roles) => {
    return (req, res, next) => {

        if (!req.user) return res.status(500).send({ message: 'Token not validated' });

        if (!roles.includes(req.user.role)) return res.status(401).json({ msg: `Roles required to exucute this action ${roles}` });
        next();
    }
}

module.exports = { isAdmin, hasRole };
