import Component from '@glimmer/component';

export default class DataTableComponent extends Component {
  get tableData() {
    return this.args.tableData ?? [];
  }

  get tableHeaders() {
    return this.tableData.reduce((accumulator, currentValue) => {
      const keys = Object.keys(currentValue);
      return new Set([...keys, ...accumulator]);
    }, []);
  }

}
