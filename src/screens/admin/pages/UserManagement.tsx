 import React, {useEffect} from "react";
import {useState} from "react";
import {UtenteModel} from "../../../models/utente.model";
import UserTable from "../components/UserTable";
import {useAppDispatch, useAppSelector} from "../../../store/store.config";
import {UsersActions} from "../../../store/users/users.action";
import {UsersTableAction} from "../../../store/users/usersTable.action";
 import UserDialog from "../components/UserDialog";
 import {UsersPaginatedState} from "../../../store/users/types";

const UserManagement = () => {

    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [userDeleted, setUserDeleted] = useState<number[]>([]);
    const [userUpdated, setUserUpdated] = useState<UtenteModel | undefined>(undefined);
    const dispatch = useAppDispatch()

    const processing = false;
    const [loading, setLoading] = useState(false)
    const {usersPaginated} = useAppSelector(state => state.usersReducer)

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
            {openUserDialog && (
              <UserDialog
                onClose={handleCloseUserDialog}
                open={openUserDialog}
                processing={processing}
                user={userUpdated}
              />
            )}
        </React.Fragment>
    );
};

export default UserManagement;
