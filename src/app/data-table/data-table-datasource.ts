import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  A: string;
  B: number;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
  H: string;
  I: string;
  J: string,
  K: string; L: string; M: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {A: "Home purchase model",B:0,C:"",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: " ",B:0,C:"",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Purchase price",B:7000000 ,C:"",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Downpayment",B:1400000 ,C:"",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Interest rate",B:10 ,C:"",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Principal amortization",B:30,C:"",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Property tax rate",B:0.25,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Annual maintainance",B:700000,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "House association dues",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Annual insurance",B:3,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Assumed annual appreciation",B:20,C:" ",D:"",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Assumed marginal income tax rate",B:7,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "General inflation",B:49144,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Monthly mortage payment",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Cost of renting similar home",B:15000,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Assumed rental price inflation",B:3 ,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
  {A: "Assumed annual (after tax) return on cash",B:10,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
 { A: "",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
 {A: "Month",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
 {A: "",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""},
 {A: "Buying Scenario",B:0,C:" ",D:" ",E:"",F:"",G:"",H:"",I:"",J:"",K:"",L:"",M:""}]
 

 
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'A': return compare(a.A, b.A, isAsc);
        case 'B': return compare(+a.B, +b.C, isAsc);
        case 'C': return compare(+a.C, +b.C, isAsc);
        case 'D': return compare(+a.D, +b.D, isAsc);
        case 'E': return compare(+a.E, +b.E, isAsc);
        case 'F': return compare(+a.F, +b.F, isAsc);
        case 'G': return compare(+a.G, +b.G, isAsc);
        case 'H': return compare(+a.H, +b.H, isAsc);
        case 'I': return compare(+a.I, +b.I, isAsc);
        case 'J': return compare(+a.J, +b.J, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
