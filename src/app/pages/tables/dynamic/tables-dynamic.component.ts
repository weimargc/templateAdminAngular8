import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { tableData } from './tables-dynamic.data';
declare let jQuery: any;

const PEOPLE = [
  {
    'id': '1',
    'name': 'José',
    'info': {
      'type': 'Pasto - Nariño',
      'dimensions': 'Cali - Valle Del Cauca'
    },
    'description': '1357.3 horas',
    'date': 'Junio 19, 2021',
    'status': {
      'progress': '29%',
      'type': 'success'
    }
  },
  {
    'id': '2',
    'name': 'José',
    'info': {
      'type': 'Pasto - Nariño',
      'dimensions': 'Bogotá D.C - Bogotá D.C'
    },
    'description': '1257.3 horas',
    'date': 'Enero 19, 2021',
    'status': {
      'progress': '19%',
      'type': 'danger'
    }
  },
  {
    'id': '3',
    'name': 'José',
    'info': {
      'type': 'Pasto - Nariño',
      'dimensions': 'Neiva - Huila'
    },
    'description': '15.3 horas',
    'date': 'Agosto 19, 2021',
    'status': {
      'progress': '49%',
      'type': 'bar-gray-light'
    }
  },
  {
    'id': '4',
    'name': 'José',
    'info': {
      'type': 'Pasto - Nariño',
      'dimensions': 'Neiva - Huila'
    },
    'description': '1357.3 horas',
    'date': 'Agosto 19, 2021',
    'status': {
      'progress': '69%'
    }
  },
  {
    'id': '5',
    'name': 'José',
    'info': {
      'type': 'Pasto - Nariño',
      'dimensions': 'Neiva - Huila'
    },
    'description': '1357.3 horas',
    'date': 'Octubre 1, 2020',
    'status': {
      'progress': '9%',
      'type': 'bar-gray-light'
    }  
  }  
  
];

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
})
export class TablesDynamicComponent implements OnInit {
  people: any[] = PEOPLE;
  peopleTemp: any[] = [...PEOPLE];

  @ViewChild(DatatableComponent, {static: true}) table: DatatableComponent;

  rows: Array<any> = [];
  columns: Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Position', name: 'position', sort: false},
    {title: 'Office', name: 'office', sort: 'asc'},
    {title: 'Extn.', name: 'ext', sort: ''},
    {title: 'Start date', name: 'startDate'},
    {title: 'Salary ($)', name: 'salary'}
  ];
  page: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 5;
  numPages: number = 1;
  length: number = 0;

  config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: '', columnName: 'position'}
  };

  ng2TableData: Array<any> = tableData;

  constructor() {
    this.length = this.ng2TableData.length;
  }

  ngOnInit(): void {
    const searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
    this.onChangeTable(this.config);
  }

  changePage(page: any, data: Array<any> = this.ng2TableData): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    const filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.ng2TableData, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.peopleTemp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.people = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openModalFiltro(){

  }
}
