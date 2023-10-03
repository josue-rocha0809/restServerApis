import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
// import validaRoles from '../middlewares/validar-roles';

import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';
import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators';



const router = Router();


router.get('/',
   // [validarJWT],
    getUsuarios,);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], putUsuario);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom(esRoleValido),
    //validarCampos
], postUsuario);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuario);

export default router;