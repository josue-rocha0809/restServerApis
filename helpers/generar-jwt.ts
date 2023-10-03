import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string): Promise<string> => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h',
            
        }, (err: Error | null, token: string | undefined) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                if (token) {
                    resolve(token);
                } else {
                    reject('No se pudo generar el token');
                }
            }
        });
    });
};
