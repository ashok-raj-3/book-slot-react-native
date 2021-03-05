
import React, { useState } from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const AletPopUp = ({ visible, hideDialog, title, message }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};


export default AletPopUp;
