import { App, Modal, setIcon } from 'obsidian';
import type RunningHeadPlugin from '../main';
import { t } from '../lang/helpers';

export class NoticesModal extends Modal {
	private plugin: RunningHeadPlugin;
	private currentFilter: string = 'all';

	constructor(app: App, plugin: RunningHeadPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("running-head-notices-modal");

		this.setTitle(t('notices_title'));

		const notices = getActiveNotices();

		const tagsContainer = contentEl.createDiv({ cls: 'running-head-notices-tags' });
		const listContainer = contentEl.createDiv({ cls: 'running-head-notices-list' });

		const renderList = () => {
			listContainer.empty();
			const filteredNotices = this.currentFilter === 'all'
				? notices
				: notices.filter(n => n.type === this.currentFilter);

			if (filteredNotices.length === 0) {
				listContainer.createEl('p', { text: t('notices_empty'), cls: 'running-head-no-notices' });
			} else {
				for (const notice of filteredNotices) {
					const itemEl = listContainer.createDiv({ cls: `running-head-notice-item is-${notice.type}` });

					const iconEl = itemEl.createDiv({ cls: `running-head-notice-icon running-head-notice-${notice.type}` });
					setIcon(iconEl, notice.icon);

					const textContainer = itemEl.createDiv({ cls: 'running-head-notice-text' });
					const titleEl = textContainer.createDiv({ text: notice.title, cls: 'running-head-notice-item-title' });
					titleEl.addClass(`running-head-notice-${notice.type}`);
					textContainer.createDiv({ text: notice.desc, cls: 'running-head-notice-item-desc' });
				}
			}
		};

		const renderTags = () => {
			tagsContainer.empty();

			const counts: Record<string, number> = { 'all': notices.length };
			notices.forEach(n => {
				counts[n.type] = (counts[n.type] || 0) + 1;
			});

			const createTag = (id: string, label: string, count: number) => {
				const tagEl = tagsContainer.createDiv({ cls: `running-head-notice-tag ${this.currentFilter === id ? 'is-active' : ''}` });
				tagEl.createSpan({ text: label, cls: 'running-head-tag-label' });
				tagEl.createSpan({ text: count.toString(), cls: 'running-head-tag-count' });
				tagEl.onClickEvent(() => {
					this.currentFilter = id;
					renderTags();
					renderList();
				});
			};

			const allLabel = t('notices_tab_all' as Parameters<typeof t>[0]);
			createTag('all', allLabel, counts['all'] || 0);

			Object.keys(counts).forEach(type => {
				if (type !== 'all') {
					const transKey = `notices_tab_${type}` as Parameters<typeof t>[0];
					const translated = t(transKey);
					const label = translated !== transKey ? translated : (type.charAt(0).toUpperCase() + type.slice(1));
					createTag(type, label, counts[type] || 0);
				}
			});
		};

		renderTags();
		renderList();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

export function getActiveNotices() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const notices: any[] = [];

	notices.push({
		type: 'warning',
		icon: 'alert-triangle',
		title: t('notice_tabs_title' as Parameters<typeof t>[0]),
		desc: t('notice_tabs_desc' as Parameters<typeof t>[0])
	});

	notices.push({
		type: 'info',
		icon: 'info',
		title: t('notice_tabs_tutorial_title' as Parameters<typeof t>[0]),
		desc: t('notice_tabs_tutorial_desc' as Parameters<typeof t>[0])
	});

	notices.push({
		type: 'info',
		icon: 'link',
		title: t('notice_links_title' as Parameters<typeof t>[0]),
		desc: t('notice_links_desc' as Parameters<typeof t>[0])
	});

	notices.push({
		type: 'info',
		icon: 'eye-off',
		title: t('notice_h1_title' as Parameters<typeof t>[0]),
		desc: t('notice_h1_desc' as Parameters<typeof t>[0])
	});

	notices.push({
		type: 'info',
		icon: 'list',
		title: t('notice_list_title' as Parameters<typeof t>[0]),
		desc: t('notice_list_desc' as Parameters<typeof t>[0])
	});

	return notices;
}
