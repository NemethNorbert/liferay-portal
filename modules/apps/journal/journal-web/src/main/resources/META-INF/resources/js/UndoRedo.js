/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import React, {useCallback, useEffect, useState} from 'react';

const META_FIELD_NAMES = {
	description: 'descriptionMapAsXML',
	friendlyURL: 'friendlyURL',
	title: 'titleMapAsXML',
};

export default function UndoRedo({initialDefaultLanguageId, languageId, namespace}) {

    const [history, setHistory] = useState([])
    const [step, setStep] = useState(-1)
    const [selectedLanguageId, setSelectedLanguageId] = useState(languageId)
    const [defaultLanguageId, setDefaultLanguageId] = useState(initialDefaultLanguageId)

    const handleUndo = () => {
        const titleInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.title}`
        );

        const descriptionInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.description}`
        );

        const friendlyURLInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.friendlyURL}`
        );
        titleInputComponent.updateInput(history[step - 1].titleInputComponent)
        descriptionInputComponent.updateInput(history[step - 1].descriptionInputComponent)
        friendlyURLInputComponent.updateInput(history[step - 1].friendlyURLInputComponent)
        Liferay.fire('undo')
        setStep(step-1)
    }

    const handleRedo = () => {
        const titleInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.title}`
        );

        const descriptionInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.description}`
        );

        const friendlyURLInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.friendlyURL}`
        );
        titleInputComponent.updateInput(history[step + 1].titleInputComponent)
        descriptionInputComponent.updateInput(history[step + 1].descriptionInputComponent)
        friendlyURLInputComponent.updateInput(history[step + 1].friendlyURLInputComponent)
        Liferay.fire('redo')
        setStep(step+1)
    }

    const handleAutoSave = useCallback(() => {
        const titleInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.title}`
        );
    
        const descriptionInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.description}`
        );
    
        const friendlyURLInputComponent = Liferay.component(
            `${namespace}${META_FIELD_NAMES.friendlyURL}`
        );

        const newHistory = {
            defaultLanguageId,
            descriptionInputComponent: descriptionInputComponent.getValue(selectedLanguageId),
            friendlyURLInputComponent: friendlyURLInputComponent.getValue(selectedLanguageId),
            selectedLanguageId,
            titleInputComponent: titleInputComponent.getValue(selectedLanguageId),
        }

        setHistory([...history.slice(0,step + 1), newHistory])
        setStep(step + 1)

    },[defaultLanguageId, history, namespace, selectedLanguageId, step])

    const handleSnapShot = () => {
        Liferay.fire('autoSave');
    }
    const defaultLocaleChangeHandler = useCallback(
		(event) => {
			const selectedLanguageId = event.item.getAttribute('data-value');

			const defaultLanguageIdInput = document.getElementById(
				`${namespace}defaultLanguageId`
			)

			if (defaultLanguageIdInput) {
				defaultLanguageIdInput.value = selectedLanguageId;
			}

			setDefaultLanguageId(selectedLanguageId);
			setSelectedLanguageId(selectedLanguageId);
		},
		[namespace, setDefaultLanguageId, setSelectedLanguageId]
	);

	const localeChangeHandler = useCallback(
		(event) => {
			const selectedLanguageId = event.item.getAttribute('data-value');

			setSelectedLanguageId(selectedLanguageId);
		},
		[setSelectedLanguageId]
	);

    useEffect(() => {
		Liferay.on(
			'inputLocalized:defaultLocaleChanged',
			defaultLocaleChangeHandler
		);
		Liferay.on('inputLocalized:localeChanged', localeChangeHandler);

		return () => {
			Liferay.detach(
				'inputLocalized:defaultLocaleChanged',
				defaultLocaleChangeHandler
			);
			Liferay.detach(
				'inputLocalized:localeChanged',
				localeChangeHandler
			);
		};
	}, [defaultLocaleChangeHandler, localeChangeHandler]);

    useEffect(() => {
      Liferay.on('autoSave', handleAutoSave)
    
      return () => {
        Liferay.detach('autoSave', handleAutoSave)
      }
    }, [handleAutoSave])
    
    useEffect(() => {
        setTimeout(() => {
            Liferay.fire('autoSave');
        }, 1000);
    }, [])
    
    return (
        <div>
            <ClayButton onClick={handleSnapShot}>
                SnapShot
            </ClayButton>

             <ClayButtonWithIcon
                aria-label="Undo"
                disabled={step <= 0}
                onClick={handleUndo}
                spritemap={Liferay.ThemeDisplay.getPathThemeImages()+"/clay/icons.svg"}
                symbol="undo"
                title="Undo"
            />

             <ClayButtonWithIcon
                aria-label="Redo"
                disabled={!history.length || step === history.length -1}
                onClick={handleRedo}
                spritemap={Liferay.ThemeDisplay.getPathThemeImages()+"/clay/icons.svg"}
                symbol="redo"
                title="Redo"
            />
        </div>
    )
}