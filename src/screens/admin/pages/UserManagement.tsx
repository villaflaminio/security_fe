 import React from "react";
import {useState} from "react";
import {UtenteModel} from "../../../models/utente.model";
import UserTable from "../components/UserTable";
import {useAppDispatch, useAppSelector} from "../../../store/store.config";
import {UsersActions} from "../../../store/users/users.action";
import {UsersTableAction} from "../../../store/users/usersTable.action";

const UserManagement = () => {

    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [userDeleted, setUserDeleted] = useState<number[]>([]);
    const [userUpdated, setUserUpdated] = useState<UtenteModel | undefined>(undefined);
    const dispatch = useAppDispatch()

    // const { addUser, isAdding } = useAddUser();
    // const { deleteUsers, isDeleting } = useDeleteUsers();
    // const { isUpdating, updateUser } = useUpdateUser();
    const processing = true;
    const [loading, setLoading] = useState(false)
    const {usersPaginated} = useAppSelector(state => state.usersReducer)


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
    const fetchData = async (pageIndex: number, pageSize: number, entity?: any, sortDirection?: string, sortField?: string) => {
        setLoading(true)
        await dispatch(UsersActions.fetchUsersAction({
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
                fetchData={fetchData}
                processing={processing}
                loading={loading}
                users={usersPaginated?.data}
                totalPages={usersPaginated?.totalPages}
                pageIndex={usersPaginated.pageIndex}
                pageSize={usersPaginated.pageSize}
                totalElements={usersPaginated.totalElements}
                setPageIndex={(pageIndex: number) => dispatch(UsersTableAction.setPageIndexAction(pageIndex))}
                setPageSize={(pageSize: number) => dispatch(UsersTableAction.setPageSizeAction(pageSize))}
                onDelete={handleOpenConfirmDeleteDialog}
                onEdit={handleOpenUserDialog}
                onSelectedChange={handleSelectedChange}
                selected={selected}
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
