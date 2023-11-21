import {
	HiOutlineSquares2X2 ,
	HiOutlineUserGroup ,
	HiOutlineUserPlus ,
	HiOutlineBuildingOffice2 ,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi2'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineSquares2X2  />
	},
	{
		key: 'groups',
		label: 'Groups',
		path: '/groups',
		icon: <HiOutlineUserGroup  />
	},
	{
		key: 'guide',
		label: 'Guides',
		path: '/guide',
		icon: <HiOutlineUserPlus  />
	},
	{
		key: 'hotels',
		label: 'Hotels',
		path: '/hotels',
		icon: <HiOutlineBuildingOffice2  />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	}
]