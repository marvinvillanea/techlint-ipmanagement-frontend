import React, { useState } from "react";
import ButtonComponent from "../../../components/button/button";
import DynamicModal from "../../../components/modal/modal";
import Loading from "../../../components/CenteredSpinner/Loading";
import DynamicForm from "./DynamicForm";

type ButtonPermissionProps = {
  permission: string;       // e.g. "all" or "add|delete"
  available_buttons: string; // e.g. "add|delete|view|edit|all"
  Config:any;
  Source:any
};

const ButtonPermission: React.FC<ButtonPermissionProps> = ({ permission, available_buttons, Config,Source }) => {
  
  // convert permission to array
  const perms = permission === "all" ? ["add"] : permission.split("|");
  console.log(available_buttons);
  // always limit to "add" only
  const buttonsToShow = perms.includes("add") ? ["add"] : [];


  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!Config) {
      return <Loading />;
  }


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
        title={'Add ' + Config.module_name}
        children={<DynamicForm Config={Config} modalClose={handleClose}  type="add" Source={Source} />}
        >
      </DynamicModal>
    </>
  );
};

export default ButtonPermission;
