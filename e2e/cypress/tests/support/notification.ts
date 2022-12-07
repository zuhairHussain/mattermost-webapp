// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// Stub the browser notification API with the given name and permission
export function spyNotificationAs(name: string, permission: string) {
    cy.window().then((win) => {
        function Notification(title: string, opts?: NotificationOptions) {
            this.title = title;
            this.opts = opts;
        }

        Notification.requestPermission = () => permission;
        Notification.close = () => true;

        win.Notification = Notification;

        cy.stub(win, 'Notification').as(name);
    });

    cy.window().should('have.property', 'Notification');
}
