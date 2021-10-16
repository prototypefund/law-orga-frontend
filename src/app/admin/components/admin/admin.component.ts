import { Component, OnInit } from '@angular/core';
import { AppSandboxService } from '../../../core/services/app-sandbox.service';

@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  settings = [
    {
      title: 'Profiles',
      description:
        "Here you can manage the users of your RLC. If you have the 'manage_users' permission you can change their contact information. If you have the 'manage_permissions' permission you can update the permissions of every user.",
      link: '/profiles',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      notifications: 0,
      class: 'rounded-tl-lg',
    },
    {
      title: 'Groups',
      description:
        "Here you can manage the groups of your RLC. If you have the 'manage_groups' permission you can add, change and remove groups. You can also add and remove users. If you have the 'manage_permissions' permission you can add permissions to a group or remove permissions from a group.",
      link: '/groups',
      icon: '<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>',
      notifications: 0,
      class: 'rounded-tr-lg',
    },
    {
      title: 'Tags',
      description: 'Add and remove tags or change the name of your existing tags. Tags that are used within records can not be deleted.',
      link: '/admin/tags',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>',
      notifications: 0,
      class: '',
    },
    {
      title: 'Record-Permit-Requests',
      description:
        'Here you can allow somebody access to a record. But first he or she must have requested access to that specific record.',
      link: '/admin/permit-requests',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>',
      notifications: 0,
      class: '',
    },
    {
      title: 'Record-Deletion-Requests',
      description: 'If somebody requested to delete a record you can take a look and allow that request here.',
      link: '/admin/deletion-requests',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>',
      notifications: 0,
      class: 'rounded-bl-lg',
    },
    {
      title: 'Record Questionnaires',
      description: 'Here you can create questionnaire templates that can be send out from the record detail page.',
      link: '/admin/questionnaires',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      notifications: 0,
      class: 'rounded-br-lg',
    },
  ];

  constructor(private appSB: AppSandboxService) {}

  ngOnInit(): void {
    this.appSB.getAdminInformation().subscribe((adminInformation) => {
      this.settings[0].notifications = adminInformation.profiles;
      this.settings[3].notifications = adminInformation.recordPermitRequests;
      this.settings[4].notifications = adminInformation.recordDeletionRequests;
    });
  }
}
