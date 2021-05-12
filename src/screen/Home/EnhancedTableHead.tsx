import { FC, memo, useEffect, useMemo, useRef } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Order } from '../../util';
import useStyles from './style';

type Prop = {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown> | undefined, property: string) => void;
    order: Order;
    orderBy: string;
};

const EnhancedTableHead: FC<Prop> = ({
    classes,
    order,
    orderBy,
    onRequestSort
}) => {
    const onRequestSortRef = useRef(onRequestSort);
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const headCells = useMemo(() => [
        { id: 'city', numeric: false, disablePadding: true, label: 'City' },
        { id: '', numeric: true, disablePadding: false, label: 'Picture' },
        { id: 'temp', numeric: true, disablePadding: false, label: 'Temperature' },
        { id: '', numeric: true, disablePadding: false, label: 'Tempature Unit' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Date' }
    ], []);

    useEffect(() => {
        onRequestSortRef.current(undefined, 'date');
    }, []);

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.id ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        ) : headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default memo(EnhancedTableHead);
