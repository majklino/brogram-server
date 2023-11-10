const crypto = require('crypto');

function hash(data){
    const sha256Hash = crypto.createHash('sha256');
    sha256Hash.update(data, 'utf8');
    const hashDigest = sha256Hash.digest('hex');
    return hashDigest;
}

module.exports = hash;