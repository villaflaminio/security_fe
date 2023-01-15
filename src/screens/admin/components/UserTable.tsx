import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    IconButton, ListItemIcon, Menu, MenuItem, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {UtenteModel} from "../../../models/utente.model";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as selectUtils from "../../../service/selectUtils";
import {PaginatedTableFilters} from "../../../store/users/types";
import {Fingerprint} from "@mui/icons-material";
import FastRewindIcon from '@mui/icons-material/FastRewind';

interface HeadCell {
    id: string;
    label: string;
    align: "center" | "left" | "right";
}

const headCells: HeadCell[] = [
    {
        id: "user",
        align: "left",
        label: "user",
    },
    {
        id: "gender",
        align: "center",
        label: "gender",
    },
    {
        id: "role",
        align: "center",
        label: "role",
    },
    {
        id: "status",
        align: "center",
        label: "status",
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead({
                               onSelectAllClick,
                               numSelected,
                               rowCount,
                           }: EnhancedTableProps) {

    return (
        <TableHead>
            <TableRow sx={{"& th": {border: 0}}}>
                <TableCell sx={{py: 0}}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all users",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align={headCell.align} sx={{py: 0}}>
                        {(headCell.label)}
                    </TableCell>
                ))}
                <TableCell align="right" sx={{py: 0}}>
                    actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

type UserRowProps = {
    index: number;
    onCheck: (id: number) => void;
    onDelete: (userIds: number[]) => void;
    onEdit: (user: UtenteModel) => void;
    processing: boolean;
    selected: boolean;
    user: UtenteModel;
};

const UserRow = ({
                     index,
                     onCheck,
                     onDelete,
                     onEdit,
                     processing,
                     selected,
                     user,
                 }: UserRowProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const labelId = `enhanced-table-checkbox-${index}`;
    const openActions = Boolean(anchorEl);

    const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseActions = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleCloseActions();
        onDelete([user.id]);
    };

    const handleEdit = () => {
        handleCloseActions();
        onEdit(user);
    };

    return (
        <TableRow
            aria-checked={selected}
            tabIndex={-1}
            key={user.id}
            selected={selected}
            sx={{"& td": {bgcolor: "background.paper", border: 0}}}
        >
            <TableCell
                padding="checkbox"
                sx={{borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem"}}
            >
                <Checkbox
                    color="primary"
                    checked={selected}
                    inputProps={{
                        "aria-labelledby": labelId,
                    }}
                    onClick={() => onCheck(user.id)}
                />
            </TableCell>
            <TableCell>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    {user && (
                        <Avatar alt="user" src={user?.imageUrl}/>
                    )}
                    {!user && (
                        <Avatar>
                            <AccountCircleIcon/>
                        </Avatar>
                    )}
                    <Box>
                        <Typography component="div" variant="h6">
                            {`${user.name} `}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="center">{user.enabled}</TableCell>
            <TableCell align="center">USER</TableCell>
            <TableCell align="center">
                {user.enabled ? (
                    <Chip label="Disabled"/>
                ) : (
                    <Chip color="primary" label="Active"/>
                )}
            </TableCell>
            <TableCell
                align="right"
                sx={{borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem"}}
            >
                <IconButton
                    id="user-row-menu-button"
                    aria-label="user actions"
                    aria-controls="user-row-menu"
                    aria-haspopup="true"
                    aria-expanded={openActions ? "true" : "false"}
                    disabled={processing}
                    onClick={handleOpenActions}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="user-row-menu"
                    anchorEl={anchorEl}
                    aria-labelledby="user-row-menu-button"
                    open={openActions}
                    onClose={handleCloseActions}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={handleEdit}>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>{" "}
                        {("common.edit")}
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <DeleteOutlineIcon/>
                        </ListItemIcon>{" "}
                        {("common.delete")}
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

type UserTableProps = {
    loading: boolean,
    totalPages: number,
    pageIndex: number,
    pageSize: number,
    totalElements: number,
    setPageSize: (pageSize: number) => void,
    setPageIndex: (pageIndex: number) => void,
    fetchData: (pageIndex: number, pageSize: number, entity?: PaginatedTableFilters, sortDirection?: string, sortField?: string) => void,
    processing: boolean;
    onDelete: (userIds: number[]) => void;
    onEdit: (user: UtenteModel) => void;
    onSelectedChange: (selected: number[]) => void;
    selected: number[];
    users?: UtenteModel[];
};

const UserTable = ({
                       loading,
                       pageSize,
                       setPageSize,
                       setPageIndex,
                       pageIndex,
                       fetchData,
                       onDelete,
                       onEdit,
                       onSelectedChange,
                       processing,
                       selected,
                       totalElements,
                       totalPages,
                       users = [],
                   }: UserTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [init, setInit] = useState(false);


    useEffect(() => {
        if (!loading && !init) {
            console.log('MyPaginatedTable: onChange pageSize', pageSize, " entity:");
            backEndMappedFetchData(0, pageSize);
        }
    }, [pageSize]);

    const backEndMappedFetchData = async (pageNumber: number, pageSize: number) => {
        setPageIndex(pageNumber);
        let entity = {}

        await fetchData(pageNumber, pageSize, entity, "ASC", "");
    }


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = selectUtils.selectAll(users);
            onSelectedChange(newSelecteds);
            return;
        }
        onSelectedChange([]);
    };

    const handleClick = (id: number) => {
        let newSelected: number[] = selectUtils.selectOne(selected, id);
        onSelectedChange(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        backEndMappedFetchData(newPage, pageSize);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };
    const getPageIndex = () => {
        return pageIndex + 1;
    }
    const nextPage = () => {
        backEndMappedFetchData((getPageIndex()), pageSize);
    }
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    const canPreviousPage = () => {
        return getPageIndex() > 1;
    }
    // if (users.length === 0) {
    //   return <Empty title="No user yet" />;
    // }
    const gotoPage = (pageNumber: number) => {
        backEndMappedFetchData(pageNumber, pageSize);
    }

    const previousPage = () => {
        backEndMappedFetchData(getPageIndex() - 2, pageSize);
    }
    return (
        <React.Fragment>
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        minWidth: 600,
                        borderCollapse: "separate",
                        borderSpacing: "0 1rem",
                    }}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={users.length}
                    />
                    <TableBody>
                        {users
                            .map((user, index) => (
                                <UserRow
                                    index={index}
                                    key={user.id}
                                    onCheck={handleClick}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                    processing={processing}
                                    selected={isSelected(user.id)}
                                    user={user}
                                />
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </TableContainer>
        </React.Fragment>
    )
        ;
};

export default UserTable;
