interface NavigationMenuProps {
    onMenuSelect: (type: string) => void;
    currentView: string;
  }
  
  export const NavigationMenu = (props: NavigationMenuProps) => {
    const getTabClass = (viewType: string) => {
      return `flex-1 py-2 rounded-t-lg text-center ${
        props.currentView === viewType 
          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white border-t border-r" 
          : "bg-gray-100 text-blue-900 hover:bg-blue-200 border-t border-r border-1"
      }`;
    };
  
    return (
      <div className="flex mt-4">
        <button 
          className={getTabClass('declaracao')}
          onClick={() => props.onMenuSelect('declaracao')}
          style={{ width: '50%' }}>
          Declaração Acadêmica
        </button>
        <button 
          className={getTabClass('historico')}
          onClick={() => props.onMenuSelect('historico')}
          style={{ width: '50%' }}>
          Histórico Acadêmico
        </button>
      </div>
    );
  };
  