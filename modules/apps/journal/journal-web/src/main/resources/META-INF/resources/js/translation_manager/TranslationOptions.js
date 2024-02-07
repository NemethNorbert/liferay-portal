/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import ClayDropDown from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayModal, {useModal} from '@clayui/modal';
import {sub} from 'frontend-js-web';
import React, {useCallback, useEffect, useState} from 'react';

import {getAllLocalizableFields} from './TranslationManager';

export default function TranslationOptions({
	fields: initialFields,
	selectedLanguageId: initialSelectedLanguageId,
}) {
	const [selectedLanguageId, setSelectedLanguageId] = useState(
		initialSelectedLanguageId
	);

	const {observer, onOpenChange, open} = useModal();

	const resetButtonHandler = () => {
		const fields = getAllLocalizableFields(initialFields);

		Object.keys(fields)
			.flatMap((fieldName) => {
				return Array.from(
					document.querySelectorAll(
						`[type="hidden"][data-field-name="${fieldName}"]`
					)
				).filter(
					(input) => input.dataset.languageid === selectedLanguageId
				);
			})
			.map((input) => {
				input.remove();
			});

		Liferay.fire('inputLocalized:resetTranslations', {
			selectedLanguageId,
		});
	};

	const onLocaleChange = useCallback(
		({item}) => setSelectedLanguageId(item.dataset.languageid),
		[setSelectedLanguageId]
	);

	useEffect(() => {
		if (initialFields) {
			Liferay.on('inputLocalized:localeChanged', onLocaleChange);
		}

		return () => {
			Liferay.detach('inputLocalized:localeChanged', onLocaleChange);
		};
	}, [initialFields, onLocaleChange]);

	return (
		<>
			<ClayDropDown
				trigger={
					<ClayButton
						className="px-2"
						displayType="secondary"
						size="sm"
						type="button"
					>
						<ClayIcon symbol="ellipsis-v" />
					</ClayButton>
				}
			>
				<ClayDropDown.ItemList>
					<ClayDropDown.Item>
						<ClayButton
							className="font-weight-normal text-secondary"
							displayType="unstyled"
							onClick={() => onOpenChange(true)}
							size="sm"
						>
							<ClayIcon className="c-mt-0" symbol="trash" />

							<span className="c-ml-3">
								{Liferay.Language.get('reset-translation')}
							</span>
						</ClayButton>
					</ClayDropDown.Item>
				</ClayDropDown.ItemList>
			</ClayDropDown>

			{open && (
				<ClayModal observer={observer} size="md" status="danger">
					<ClayModal.Header>
						{sub(
							Liferay.Language.get('delete-x-translation'),
							selectedLanguageId
						)}
					</ClayModal.Header>

					<ClayModal.Body>
						<p
							dangerouslySetInnerHTML={{
								__html: sub(
									Liferay.Language.get(
										'x-translation-will-be-deleted-and-content-fields-will-be-set-to-default-language'
									),
									selectedLanguageId
								),
							}}
						/>
					</ClayModal.Body>

					<ClayModal.Footer
						last={
							<ClayButton.Group spaced>
								<ClayButton
									displayType="secondary"
									onClick={() => onOpenChange(false)}
								>
									{Liferay.Language.get('cancel')}
								</ClayButton>

								<ClayButton
									displayType="danger"
									onClick={() => {
										onOpenChange(false);
										resetButtonHandler();
									}}
								>
									{Liferay.Language.get('delete')}
								</ClayButton>
							</ClayButton.Group>
						}
					/>
				</ClayModal>
			)}
		</>
	);
}
