import React from "react";
import {useState} from "react";
import {UtenteModel} from "../../../models/utente.model";
import UserTable from "../components/UserTable";

const UserManagement = () => {

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [userDeleted, setUserDeleted] = useState<number[]>([]);
  const [userUpdated, setUserUpdated] = useState<UtenteModel | undefined>(undefined);

  // const { addUser, isAdding } = useAddUser();
  // const { deleteUsers, isDeleting } = useDeleteUsers();
  // const { isUpdating, updateUser } = useUpdateUser();
    const processing = true;

    const responseArray  = [
      {
          "id": "1",
          "imageUrl": "https://4.bp.blogspot.com/-klQjV5L27_s/T73fozhXluI/AAAAAAAAAkI/_75K0D7Hpqw/s1600/smiley-face2.jpg",
          "disabled": false,
          "email": "rhys@arriaga.com",
          "name": "Rhys",
          "gender": "M",
          "lastName": "Arriaga",
          "role": "Admin"
      },
      {
          "id": "2",
          "imageUrl": "https://4.bp.blogspot.com/-klQjV5L27_s/T73fozhXluI/AAAAAAAAAkI/_75K0D7Hpqw/s1600/smiley-face2.jpg",
          "disabled": false,
          "email": "laura@core.com",
          "name": "Laura",
          "gender": "F",
          "lastName": "Core",
          "role": "Member"
      },
      {
          "id": "3",
          "imageUrl": "https://4.bp.blogspot.com/-klQjV5L27_s/T73fozhXluI/AAAAAAAAAkI/_75K0D7Hpqw/s1600/smiley-face2.jpg",
          "disabled": false,
          "email": "joshua@jagger.com",
          "name": "Joshua",
          "gender": "M",
          "lastName": "Jagger",
          "role": "Member"
      },
      {
          "id": "4",
          "imageUrl": "https://4.bp.blogspot.com/-klQjV5L27_s/T73fozhXluI/AAAAAAAAAkI/_75K0D7Hpqw/s1600/smiley-face2.jpg",
          "disabled": true,
          "email": "jason@jimenez.com",
          "name": "Jason",
          "gender": "M",
          "lastName": "Jimenez",
          "role": "Member"
      },
      {
          "id": "5",
          "avatar": "",
          "disabled": true,
          "email": "rhonda@mcguire.com",
          "name": "Rhonda",
          "gender": "F",
          "lastName": "Mcguire",
          "role": "Member"
      },
      {
          "id": "6",
          "avatar": "",
          "disabled": false,
          "email": "aaron@moreno.com",
          "name": "Aaron",
          "gender": "M",
          "lastName": "Moreno",
          "role": "Member"
      },
      {
          "id": "7",
          "avatar": "",
          "disabled": false,
          "email": "carley@murray.com",
          "name": "Carley",
          "gender": "F",
          "lastName": "Murray",
          "role": "Member"
      },
      {
          "id": "8",
          "avatar": "",
          "disabled": false,
          "email": "cherise@owen.com",
          "name": "Cherise",
          "gender": "F",
          "lastName": "Owen",
          "role": "Member"
      },
      {
          "id": "9",
          "avatar": "",
          "disabled": false,
          "email": "nathan@romero.com",
          "name": "Nathan",
          "gender": "M",
          "lastName": "Romero",
          "role": "Member"
      },
      {
          "id": "10",
          "avatar": "",
          "disabled": false,
          "email": "olivia@spence.com",
          "firstName": "Olivia",
          "gender": "F",
          "lastName": "Spence",
          "role": "Member"
      },
      {
          "id": "11",
          "avatar": "",
          "disabled": false,
          "email": "elisha@wade.com",
          "firstName": "Elisha",
          "gender": "F",
          "lastName": "Wade",
          "role": "Member"
      }
  ]
    const data = responseArray.map((item: any) => ({ ...item, id: item.id.toString() }));
    const [loading, setLoading] = useState(false)


  const handleAddUser = async (user: Partial<UtenteModel>) => {
    // addUser(user as User)
    //   .then(() => {
    //     snackbar.success(
    //       t("userManagement.notifications.addSuccess", {
    //         user: `${user.firstName} ${user.lastName}`,
    //       })
    //     );
    //     setOpenUserDialog(false);
    //   })
    //   .catch(() => {
    //     snackbar.error(t("common.errors.unexpected.subTitle"));
    //   });
  };

  const handleDeleteUsers = async () => {
    // deleteUsers(userDeleted)
    //   .then(() => {
    //     snackbar.success(t("userManagement.notifications.deleteSuccess"));
    //     setSelected([]);
    //     setUserDeleted([]);
    //     setOpenConfirmDeleteDialog(false);
    //   })
    //   .catch(() => {
    //     snackbar.error(t("common.errors.unexpected.subTitle"));
    //   });
  };

  const handleUpdateUser = async (user: UtenteModel) => {
    // updateUser(user)
    //   .then(() => {
    //     snackbar.success(
    //       t("userManagement.notifications.updateSuccess", {
    //         user: `${user.firstName} ${user.lastName}`,
    //       })
    //     );
    //     setOpenUserDialog(false);
    //   })
    //   .catch(() => {
    //     snackbar.error(t("common.errors.unexpected.subTitle"));
    //   });
  };

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseUserDialog = () => {
    setUserUpdated(undefined);
    setOpenUserDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (userIds: number[]) => {
    setUserDeleted(userIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenUserDialog = (user?: UtenteModel) => {
    setUserUpdated(user);
    setOpenUserDialog(true);
  };

  const handleSelectedChange = (newSelected: number[]) => {
    setSelected(newSelected);
  };
    const fetchData = async (pageIndex:number,pageSize:number,entity?:any,sortDirection?:string,sortField?:string) => {
        setLoading(true)
        await dispatch(HomeAction.fetchProprietariAction({
            entity,
            page: pageIndex,
            size: pageSize,
            sortDirection: sortDirection,
            sortField: sortField
        }))
        setLoading(false)
    }

  return (
    <React.Fragment>
      {/*<AdminAppBar>*/}
      {/*  {!selected.length ? (*/}
      {/*    <AdminToolbar title={t("userManagement.toolbar.title")}>*/}
      {/*      <Fab*/}
      {/*        aria-label="logout"*/}
      {/*        color="primary"*/}
      {/*        disabled={processing}*/}
      {/*        onClick={() => handleOpenUserDialog()}*/}
      {/*        size="small"*/}
      {/*      >*/}
      {/*        <AddIcon />*/}
      {/*      </Fab>*/}
      {/*    </AdminToolbar>*/}
      {/*  ) : (*/}
      {/*    <SelectToolbar*/}
      {/*      processing={processing}*/}
      {/*      onCancel={handleCancelSelected}*/}
      {/*      onDelete={handleOpenConfirmDeleteDialog}*/}
      {/*      selected={selected}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</AdminAppBar>*/}
      <UserTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        users={data}
      />
      {/*<ConfirmDialog*/}
      {/*  description={t("userManagement.confirmations.delete")}*/}
      {/*  pending={processing}*/}
      {/*  onClose={handleCloseConfirmDeleteDialog}*/}
      {/*  onConfirm={handleDeleteUsers}*/}
      {/*  open={openConfirmDeleteDialog}*/}
      {/*  title={t("common.confirmation")}*/}
      {/*/>*/}
      {/*{openUserDialog && (*/}
      {/*  <UserDialog*/}
      {/*    onAdd={handleAddUser}*/}
      {/*    onClose={handleCloseUserDialog}*/}
      {/*    onUpdate={handleUpdateUser}*/}
      {/*    open={openUserDialog}*/}
      {/*    processing={processing}*/}
      {/*    user={userUpdated}*/}
      {/*  />*/}
      {/*)}*/}
    </React.Fragment>
  );
};

export default UserManagement;
