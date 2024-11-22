// components/GoogleLoginButton.tsx
import { useGoogleLogin } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onSuccess: (tokenResponse: unknown) => void;
  onFailure: (error: unknown) => void;
  loading: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onFailure,loading }) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => onSuccess(tokenResponse),
    onError: error => onFailure(error),
    scope: "https://www.googleapis.com/auth/contacts.readonly"
  });

  return (
    <button  onClick={() => login()} className='hover:bg-tertiary w-full hover:text-white transition-colors px-10 py-2 text-mobile-body text-tertiary border-tertiary border rounded-lg ' disabled={loading} >
      {!loading ? 'Importer les contacts' : 'Importation en cours ... '}
    </button>
  );
};

export default GoogleLoginButton;
