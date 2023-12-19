import useUpdatePassword from "@/hooks/students/use-update-password";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AlertMessage } from "../message/message";
7
interface ModalUpdatePasswordProps {
  onCancel: () => void;
  emailUser: string;
}

const ModalUpdatePassword = (props: ModalUpdatePasswordProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updatePassword } = useUpdatePassword();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSavePassword = async () => {
    setError('');
    if (newPassword === confirmPassword) {
      setError('');
      await updatePassword(props.emailUser.toLowerCase(), newPassword);
      setSuccessMessage("Senha alterada com sucesso!");
    } else {
      setError('As senhas não correspondem.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>
      <div className="bg-white p-6 rounded shadow-md w-1/3 py-16 relative z-50">
        <button
          onClick={props.onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose />
        </button>
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">Altere sua senha</p>
          </div>
          {successMessage && (
            <AlertMessage type="success" message={successMessage} />
          )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Nova senha
              </label>
              <div className="mt-2 mb-1">
                <input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                />
              </div>
              <label htmlFor="password" className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                  Confirme a senha
              </label>
              <div className="mt-2">
              <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
            <div className="flex justify-center mt-10">
              <button onClick={handleSavePassword}
                className="flex mr-4 bg-gradient-to-r from-cyan-700 to-cyan-900 text-white px-4 py-2 rounded hover:from-cyan-900 hover:to-cyan-700"
              >
                Salvar nova senha
              </button>
          </div>
      </div>
    </div>
  );
};

export { ModalUpdatePassword };
