import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DataTableComponent extends Component {
  @tracked tableData = [];

  constructor(owner, args) {
    super(owner, args);

    this.tableData = (this.args.tableData ?? []).map((tableRow, index) => {
      return {
        id: index,
        selected: false,
        rowData: tableRow,
      };
    });
  }

  @action
  toggleRowSelection(selectedRow, event) {
    this.tableData = this.tableData.map((row) => {
      if (selectedRow.id !== row.id) {
        return row;
      }
      return { ...row, selected: event.target.checked };
    });
  }

  @action
  toggleSelectAll(event) {
    this.tableData = this.tableData.map((row) => {
      return { ...row, selected: event.target.checked };
    });
  }

  @action
  selectedAction() {
    this.args.selectedAction(this.selectedData);
  }

  get tableHeaders() {
    return this.tableData.reduce((accumulator, currentValue) => {
      const headers = Object.keys(currentValue.rowData);
      return new Set([...headers, ...accumulator]);
    }, []);
  }

  get selectedData() {
    return this.tableData.reduce((accumulator, currentValue) => {
      if (!currentValue.selected) return accumulator;
      return [...accumulator, currentValue.rowData];
    }, [])
  }

  get indeterminateRowSelection() {
    const selectedCount = this.selectedData.length;
    return selectedCount !== 0 && selectedCount !== this.tableData.length;
  }

  get allRowsSelected() {
    return this.selectedData.length === this.tableData.length;
  }

  get selectedCount() {
    return this.selectedData.length;
  }
}
