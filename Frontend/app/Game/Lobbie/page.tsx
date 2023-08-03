/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:21 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 08:47:31 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import './Settings/Settings.css'
import Rooms from './Settings/Settings';
const page = () => 
{
    return(
        <div id='Game'>
            <Rooms/>
        </div>
    );
}

export default page;