import { Component, OnInit } from '@angular/core';
import { AuthorizationMenuService } from 'src/app/services/common/models/authorization-menu.service';
import { Menu } from 'src/app/contract/authorization/menu';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

interface ITreeMenu {
  menuName?: string;
  actions?: ITreeMenu[];
  actionCode?: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss'],
})
export class AuthorizeMenuComponent implements OnInit {
  constructor(
    private authorizeDefinition: AuthorizationMenuService,
    private dialogService: DialogService
  ) {}

  async ngOnInit() {
    const menuData = await this.authorizeDefinition.getAuthorizeDefinitonEndpoints();
  
    this.dataSource.data = menuData.map((m) => ({
      menuName: m.menuName, 
      actions: m.actions.map((a) => ({
        menuName: a.definition,  
        actionCode: a.actionCode,  
      })),
    }));
  }
  

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: menu.actions?.length > 0,
        name: menu.menuName,
        level: level,
        code: menu.actionCode,
      };
    },
    (menu) => menu.level,
    (menu) => menu.expandable,
    (menu) => menu.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code: string, name: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code: code, name: name },
      options: {
        width: '650px',
      },
      afterClosed: () => {},
    });
    
  }
}
