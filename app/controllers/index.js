import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {

  @action
  downloadFiles(selectedRows) {
    alert(selectedRows.map((row) => row.path).join("\n"));
  }
}
