import { FC, memo, useCallback, useState } from "react";
import moment from 'moment';
import * as routerDom from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import useStyles from './style';
import { getComparator, Order, stableSort, getStorageData, setStorageData, temperatureConverter } from "../../util";
import { ITableData } from "./ITableData";
import EnhancedTableHead from "./EnhancedTableHead";

type Prop = {
    readonly rows: Array<ITableData<string>>;
    readonly onToggleHide: (id: string) => void;
};

const EnhancedTable: FC<Prop> = ({ rows, onToggleHide }) => {
    const classes = useStyles();
    const navigate = (routerDom as any).useNavigate();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = useCallback((event: React.MouseEvent<unknown> | undefined, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>, state: ITableData<string>) => {
        const city = state.city.toLowerCase();

        if ((event.target as HTMLInputElement).type === 'checkbox') {
            const cities: string[] = getStorageData('cities');
            if (Array.isArray(cities)) {
                setStorageData(
                    'cities',
                    cities.includes(city)
                        ? cities.filter(cityName => cityName.toLowerCase() !== city)
                        : [...cities, city]
                );
            }else {
                setStorageData('cities', [city]);
            }

            return onToggleHide(city);
        }

        navigate(city, { state });
    }, [navigate, onToggleHide]);

    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort<ITableData<string>>(rows, getComparator(order, orderBy as keyof ITableData<string>))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        classes={{
                                            selected: classes.selected
                                        }}
                                        hover
                                        onClick={event => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={row.isHidden}
                                        tabIndex={-1}
                                        key={index}
                                        selected={row.isHidden}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={row.isHidden ?? false}
                                                value={row.isHidden ?? false}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.city}
                                        </TableCell>
                                        <TableCell align="right">
                                            <img width={100} src={row.picture} alt={row.city} />
                                        </TableCell>
                                        <TableCell align="right">{temperatureConverter(row.temp, row.tempType, 1)}</TableCell>
                                        <TableCell align="right">C</TableCell>
                                        <TableCell align="right">{moment(row.date).format('LLL')}</TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default memo(EnhancedTable);
