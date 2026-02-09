import React, { useState } from "react";
import ButtonComponent from "../../components/button/button";
import DynamicModal from "../../components/modal/modal";

type ButtonPermissionProps = {
  permission: string;       // e.g. "all" or "add|delete"
  available_buttons: string; // e.g. "add|delete|view|edit|all"
};

const ButtonPermission: React.FC<ButtonPermissionProps> = ({ permission, available_buttons }) => {
  
  // convert permission to array
  const perms = permission === "all" ? ["add"] : permission.split("|");

  // always limit to "add" only
  const buttonsToShow = perms.includes("add") ? ["add"] : [];


    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);


  return (
     <>
      <div className="button-group">
        {buttonsToShow.map((btn) => (
          <ButtonComponent 
              key={btn}
              type="button"
              colorType={`primary`}
              onClick={handleOpen}
              >
            {btn.charAt(0).toUpperCase() + btn.slice(1)}
          </ButtonComponent>
        ))}
      </div>

      <DynamicModal
        isOpen={isOpen}
        onClose={handleClose}
        title="User Details"
        >
      
        </DynamicModal>
    </>
  );
};

export default ButtonPermission;
