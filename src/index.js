import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, RangeControl } from '@wordpress/components';

import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
} from '@wordpress/block-editor';

registerBlockType('create-block/simple-progressbar', {
	apiVersion: 2,
	attributes: {
		bg_color: { type: 'string', default: '#000000' },
		text_color: { type: 'string', default: '#ffffff' },
		progressbar_caption: {
			type: 'string',
			default: 'Caption',
		},
		progressbar: {
			type: 'string',
			default: '50',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const onChangeBGColor = (hexColor) => {
			setAttributes({ bg_color: hexColor });
		};

		const onChangeTextColor = (hexColor) => {
			setAttributes({ text_color: hexColor });
		};

		return (
			<div {...useBlockProps()}>
				<InspectorControls key="setting">
					<div id="simple-progressbar-controls">
						<fieldset>
							<legend className="blocks-base-control__label">
								{__('Background color', 'simple-progressbar')}
							</legend>
							<ColorPalette // Element Tag for Gutenberg standard colour selector
								onChange={onChangeBGColor} // onChange event callback
							/>
						</fieldset>
						<fieldset>
							<legend className="blocks-base-control__label">
								{__('Text color', 'simple-progressbar')}
							</legend>
							<ColorPalette // Element Tag for Gutenberg standard colour selector
								onChange={onChangeTextColor} // onChange event callback
							/>
						</fieldset>
						<fieldset>
							<legend className="blocks-base-control__label">
								{__('Caption', 'simple-progressbar')}
							</legend>
							<TextControl
								value={attributes.progressbar_caption}
								onChange={(val) =>
									setAttributes({ progressbar_caption: val })
								}
							/>
						</fieldset>
						<fieldset>
							<legend className="blocks-base-control__label">
								{__('Progress', 'simple-progressbar')}
							</legend>
							<RangeControl
								value={attributes.progressbar_caption}
								onChange={(val) =>
									setAttributes({ progressbar: val })
								}
								min={1}
								max={100}
								step={1}
								initialPosition={50}
							/>
						</fieldset>
					</div>
				</InspectorControls>
				<div
					{...useBlockProps.save()}
					style={{
						width: '100%',
						border: `0.5px solid ${attributes.bg_color}`,
					}}
				>
					<div
						className="progressbar-fill-area"
						style={{
							width: `${attributes.progressbar}%`,
							backgroundColor: attributes.bg_color,
							color: attributes.text_color,
							textAlign: 'center',
						}}
					>{`${attributes.progressbar_caption}`}</div>
				</div>
			</div>
		);
	},
	save: ({ attributes }) => {
		return (
			<div
				{...useBlockProps.save()}
				style={{
					width: '100%',
					border: `0.5px solid ${attributes.bg_color}`,
				}}
			>
				<div
					className="progressbar-fill-area"
					style={{
						width: `${attributes.progressbar}%`,
						backgroundColor: attributes.bg_color,
						color: attributes.text_color,
						textAlign: 'center',
					}}
				>{`${attributes.progressbar_caption}`}</div>
			</div>
		);
	},
});
