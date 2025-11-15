import PacienteController from './controllers/PacienteController.js'
import UnidadeSaudeController from './controllers/UnidadeSaudeController.js'
import FuncionarioController from './controllers/FuncionarioController.js'
import MedicamentosController from './controllers/MedicamentosController.js'
import ConsultasController from './controllers/ConsultasController.js'
import UsuarioController from './controllers/UsuarioController.js'
import PrescricoesController from './controllers/PrescricoesController.js'
import EstatisticasController from './controllers/EstatisticasController.js'
import MedicoController from './controllers/MedicoController.js'
import AdminController from './controllers/AdminController.js'

export function adicionarRotas(api) {
  api.use(PacienteController);
  api.use(UnidadeSaudeController);
  api.use(FuncionarioController);
  api.use(MedicamentosController);
  api.use(ConsultasController)
  api.use(UsuarioController)
  api.use(PrescricoesController)
  api.use(EstatisticasController)
  api.use(MedicoController)
  api.use(AdminController)
}