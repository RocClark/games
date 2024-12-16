

function ErrorMessage({notification}) {
  if (!notification) return null;
      return (
        <div className="fixed bottom-4 bg-black text-white p-4 rounded">
        You have already entered this letter
      </div>
  
        
      );
  }
  
export default ErrorMessage;