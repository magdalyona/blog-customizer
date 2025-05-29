import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useEffect, useState, useRef } from 'react';

import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: (style: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState }: ArticleParamsFormProps) => {
	const formReF = useRef<HTMLFormElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
		event.preventDefault();
		articleState(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		articleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (formReF.current && !formReF.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleChangeFontFamily = (item: OptionType) => {
		setFormState({
			...formState,
			fontFamilyOption: item,
		});
	};

	const handleChangeFontSize = (item: OptionType) => {
		setFormState({
			...formState,
			fontSizeOption: item,
		});
	};

	const handleChangeColor = (item: OptionType) => {
		setFormState({
			...formState,
			fontColor: item,
		});
	};

	const handleWidthAr = (item: OptionType) => {
		setFormState({
			...formState,
			contentWidth: item,
		});
	};

	const handleBackgroundColor = (item: OptionType) => {
		setFormState({
			...formState,
			backgroundColor: item,
		});
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					ref={formReF}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text family={'open-sans'} as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChangeFontFamily}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChangeFontSize}
						title='Размер шрифта'
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChangeColor}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColor}
						title='Цвет фона'
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleWidthAr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
