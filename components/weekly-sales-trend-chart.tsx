'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const amountData = [
  { week: '7/3', 'M/長袖CS': 53448, 'M/半袖CS': 1696617, 'M/JK': 0, 'M/BZ': 170836, 'M/VEST': 123000, 'M/PT': 1259815, 'M/SPT': 460239, 'M/KNIT': 91765, 'M/ACC': 1153587, 'M/TTL': 5009307, 'L/長袖CS': 205151, 'L/半袖CS': 712452, 'L/JK': 42322, 'L/BZ': 57000, 'L/VEST': 27000, 'L/SK': 459521, 'L/PT': 460468, 'L/SPT': 9164, 'L/OP': 14203, 'L/KNIT': 99984, 'L/ACC': 319254, 'L/TTL': 2406519 },
  { week: '7/10', 'M/長袖CS': 33936, 'M/半袖CS': 1234088, 'M/JK': 0, 'M/BZ': 114043, 'M/VEST': 118907, 'M/PT': 568734, 'M/SPT': 263116, 'M/KNIT': 72948, 'M/ACC': 799830, 'M/TTL': 3205602, 'L/長袖CS': 138012, 'L/半袖CS': 605716, 'L/JK': 0, 'L/BZ': 120000, 'L/VEST': 0, 'L/SK': 369998, 'L/PT': 204763, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 22798, 'L/ACC': 246410, 'L/TTL': 1707697 },
  { week: '7/17', 'M/長袖CS': 27000, 'M/半袖CS': 1125337, 'M/JK': 0, 'M/BZ': 141100, 'M/VEST': 75573, 'M/PT': 450872, 'M/SPT': 341106, 'M/KNIT': 21403, 'M/ACC': 948088, 'M/TTL': 3130479, 'L/長袖CS': 118250, 'L/半袖CS': 391137, 'L/JK': 0, 'L/BZ': 27504, 'L/VEST': 25573, 'L/SK': 295513, 'L/PT': 300993, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 25125, 'L/ACC': 210302, 'L/TTL': 1394397 },
  { week: '7/24', 'M/長袖CS': 146800, 'M/半袖CS': 953821, 'M/JK': 0, 'M/BZ': 149000, 'M/VEST': 206000, 'M/PT': 275500, 'M/SPT': 248370, 'M/KNIT': 46000, 'M/ACC': 808376, 'M/TTL': 2833867, 'L/長袖CS': 319370, 'L/半袖CS': 347954, 'L/JK': 0, 'L/BZ': 29000, 'L/VEST': 55000, 'L/SK': 197093, 'L/PT': 177000, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 26000, 'L/ACC': 171051, 'L/TTL': 1322468 },
  { week: '7/31', 'M/長袖CS': 76000, 'M/半袖CS': 641053, 'M/JK': 0, 'M/BZ': 89000, 'M/VEST': 50359, 'M/PT': 448554, 'M/SPT': 408060, 'M/KNIT': 0, 'M/ACC': 1076297, 'M/TTL': 2789323, 'L/長袖CS': 211039, 'L/半袖CS': 303885, 'L/JK': 0, 'L/BZ': 115415, 'L/VEST': 55000, 'L/SK': 75937, 'L/PT': 220733, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 127000, 'L/ACC': 161866, 'L/TTL': 1270875 },
  { week: '8/7', 'M/長袖CS': 177031, 'M/半袖CS': 733121, 'M/JK': 0, 'M/BZ': 222000, 'M/VEST': 102000, 'M/PT': 463247, 'M/SPT': 152000, 'M/KNIT': 0, 'M/ACC': 718438, 'M/TTL': 2567837, 'L/長袖CS': 342494, 'L/半袖CS': 328842, 'L/JK': 0, 'L/BZ': 29000, 'L/VEST': 28000, 'L/SK': 173153, 'L/PT': 123511, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 53000, 'L/ACC': 131248, 'L/TTL': 1209248 },
  { week: '8/14', 'M/長袖CS': 125000, 'M/半袖CS': 480423, 'M/JK': 0, 'M/BZ': 216000, 'M/VEST': 139000, 'M/PT': 267602, 'M/SPT': 109113, 'M/KNIT': 76000, 'M/ACC': 533089, 'M/TTL': 1946227, 'L/長袖CS': 360319, 'L/半袖CS': 331698, 'L/JK': 0, 'L/BZ': 61000, 'L/VEST': 111000, 'L/SK': 198387, 'L/PT': 130076, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 97390, 'L/ACC': 128943, 'L/TTL': 1418813 },
  { week: '8/21', 'M/長袖CS': 587591, 'M/半袖CS': 666200, 'M/JK': 53100, 'M/BZ': 399734, 'M/VEST': 348697, 'M/PT': 550262, 'M/SPT': 199990, 'M/KNIT': 72235, 'M/ACC': 759875, 'M/TTL': 3637684, 'L/長袖CS': 419298, 'L/半袖CS': 266649, 'L/JK': 53100, 'L/BZ': 78640, 'L/VEST': 243400, 'L/SK': 338106, 'L/PT': 82500, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 174674, 'L/ACC': 223535, 'L/TTL': 1879902 },
  { week: '8/28', 'M/長袖CS': 440562, 'M/半袖CS': 421170, 'M/JK': 118000, 'M/BZ': 268900, 'M/VEST': 473435, 'M/PT': 565000, 'M/SPT': 108344, 'M/KNIT': 18869, 'M/ACC': 595524, 'M/TTL': 3009804, 'L/長袖CS': 373404, 'L/半袖CS': 206913, 'L/JK': 118000, 'L/BZ': 0, 'L/VEST': 214963, 'L/SK': 234627, 'L/PT': 83000, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 39293, 'L/ACC': 92053, 'L/TTL': 1362253 },
  { week: '9/4', 'M/長袖CS': 578102, 'M/半袖CS': 370064, 'M/JK': 53301, 'M/BZ': 278800, 'M/VEST': 183056, 'M/PT': 517682, 'M/SPT': 37156, 'M/KNIT': 79269, 'M/ACC': 648166, 'M/TTL': 2745596, 'L/長袖CS': 381320, 'L/半袖CS': 171370, 'L/JK': 336499, 'L/BZ': 56000, 'L/VEST': 357200, 'L/SK': 341357, 'L/PT': 131400, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 185488, 'L/ACC': 54315, 'L/TTL': 2014949 },
  { week: '9/11', 'M/長袖CS': 1448531, 'M/半袖CS': 1202716, 'M/JK': 38115, 'M/BZ': 1074000, 'M/VEST': 728981, 'M/PT': 1316960, 'M/SPT': 47000, 'M/KNIT': 824593, 'M/ACC': 2304512, 'M/TTL': 8985408, 'L/長袖CS': 987153, 'L/半袖CS': 467187, 'L/JK': 103000, 'L/BZ': 80221, 'L/VEST': 413203, 'L/SK': 464982, 'L/PT': 409462, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 499974, 'L/ACC': 268716, 'L/TTL': 3693898 },
  { week: '9/18', 'M/長袖CS': 2132214, 'M/半袖CS': 1172234, 'M/JK': 333061, 'M/BZ': 1002779, 'M/VEST': 781202, 'M/PT': 2504740, 'M/SPT': 22776, 'M/KNIT': 1560283, 'M/ACC': 3181911, 'M/TTL': 12691200, 'L/長袖CS': 1282962, 'L/半袖CS': 521848, 'L/JK': 390300, 'L/BZ': 134550, 'L/VEST': 775111, 'L/SK': 850864, 'L/PT': 955639, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 733828, 'L/ACC': 403206, 'L/TTL': 6048308 },
  { week: '9/25', 'M/長袖CS': 1280832, 'M/半袖CS': 566078, 'M/JK': 288907, 'M/BZ': 1095439, 'M/VEST': 797075, 'M/PT': 1462279, 'M/SPT': 62080, 'M/KNIT': 825358, 'M/ACC': 1534379, 'M/TTL': 7912427, 'L/長袖CS': 792941, 'L/半袖CS': 190942, 'L/JK': 59000, 'L/BZ': 123500, 'L/VEST': 494569, 'L/SK': 342626, 'L/PT': 577928, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 407649, 'L/ACC': 261282, 'L/TTL': 3250437 },
  { week: '10/2', 'M/長袖CS': 2246015, 'M/半袖CS': 403924, 'M/JK': 0, 'M/BZ': 1119891, 'M/VEST': 992520, 'M/PT': 1747388, 'M/SPT': 0, 'M/KNIT': 1211263, 'M/ACC': 1640314, 'M/TTL': 9361315, 'L/長袖CS': 1565690, 'L/半袖CS': 199289, 'L/JK': 331343, 'L/BZ': 372191, 'L/VEST': 874844, 'L/SK': 675872, 'L/PT': 1390801, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 949877, 'L/ACC': 260105, 'L/TTL': 6620012 },
  { week: '10/9', 'M/長袖CS': 3725110, 'M/半袖CS': 241731, 'M/JK': 165200, 'M/BZ': 1964337, 'M/VEST': 1308386, 'M/PT': 3620482, 'M/SPT': 23000, 'M/KNIT': 2244832, 'M/ACC': 2021439, 'M/TTL': 15314517, 'L/長袖CS': 2079928, 'L/半袖CS': 65719, 'L/JK': 387827, 'L/BZ': 565521, 'L/VEST': 914084, 'L/SK': 894536, 'L/PT': 1362688, 'L/SPT': 140164, 'L/OP': 0, 'L/KNIT': 1819929, 'L/ACC': 627088, 'L/TTL': 8857484 },
  { week: '10/16', 'M/長袖CS': 3416863, 'M/半袖CS': 136050, 'M/JK': 225751, 'M/BZ': 2212321, 'M/VEST': 1411949, 'M/PT': 2803153, 'M/SPT': 24000, 'M/KNIT': 1967375, 'M/ACC': 2191428, 'M/TTL': 14388890, 'L/長袖CS': 1911121, 'L/半袖CS': 52715, 'L/JK': 277300, 'L/BZ': 471116, 'L/VEST': 750033, 'L/SK': 551696, 'L/PT': 1105727, 'L/SPT': 448950, 'L/OP': 0, 'L/KNIT': 1773487, 'L/ACC': 360542, 'L/TTL': 7702687 },
  { week: '10/23', 'M/長袖CS': 2987997, 'M/半袖CS': 133477, 'M/JK': 0, 'M/BZ': 1376559, 'M/VEST': 894641, 'M/PT': 2370593, 'M/SPT': 0, 'M/KNIT': 2612404, 'M/ACC': 1596768, 'M/TTL': 11972439, 'L/長袖CS': 1531310, 'L/半袖CS': 33000, 'L/JK': 59000, 'L/BZ': 349250,  'L/VEST': 638085, 'L/SK': 560055, 'L/PT': 890932, 'L/SPT': 417500, 'L/OP': 0, 'L/KNIT': 1634797, 'L/ACC': 263620, 'L/TTL': 6377549 },
  { week: '10/30', 'M/長袖CS': 3995731, 'M/半袖CS': 122400, 'M/JK': 177000, 'M/BZ': 1061783, 'M/VEST': 1105013, 'M/PT': 2657771, 'M/SPT': 0, 'M/KNIT': 2236510, 'M/ACC': 1951453, 'M/TTL': 13307661, 'L/長袖CS': 1856503, 'L/半袖CS': 35850, 'L/JK': 442500, 'L/BZ': 387872, 'L/VEST': 847786, 'L/SK': 1043644, 'L/PT': 1270936, 'L/SPT': 356414, 'L/OP': 0, 'L/KNIT': 2167235, 'L/ACC': 408856, 'L/TTL': 8817596 },
  { week: '11/6', 'M/長袖CS': 2564046, 'M/半袖CS': 70428, 'M/JK': 59000, 'M/BZ': 1290790, 'M/VEST': 891667, 'M/PT': 2627919, 'M/SPT': 0, 'M/KNIT': 2430945, 'M/ACC': 1242778, 'M/TTL': 11177573, 'L/長袖CS': 1752247, 'L/半袖CS': 18000, 'L/JK': 112100, 'L/BZ': 573438, 'L/VEST': 490225, 'L/SK': 783671, 'L/PT': 846262, 'L/SPT': 266988, 'L/OP': 0, 'L/KNIT': 1372110, 'L/ACC': 411337, 'L/TTL': 6626378 },
  { week: '11/13', 'M/長袖CS': 3832770, 'M/半袖CS': 42000, 'M/JK': 118000, 'M/BZ': 2034922, 'M/VEST': 745781, 'M/PT': 3040125, 'M/SPT': 0, 'M/KNIT': 1995200, 'M/ACC': 2058040, 'M/TTL': 13866838, 'L/長袖CS': 2632462, 'L/半袖CS': 9977, 'L/JK': 109150, 'L/BZ': 1105377, 'L/VEST': 913952, 'L/SK': 927131, 'L/PT': 1996186, 'L/SPT': 170000, 'L/OP': 0, 'L/KNIT': 2346105, 'L/ACC': 576194, 'L/TTL': 10786534 },
  { week: '11/20', 'M/長袖CS': 4077020, 'M/半袖CS': 60000, 'M/JK': 118000, 'M/BZ': 2136115, 'M/VEST': 896862, 'M/PT': 3103075, 'M/SPT': 0, 'M/KNIT': 5046099, 'M/ACC': 1999192, 'M/TTL': 17436363, 'L/長袖CS': 2729789, 'L/半袖CS': 16000, 'L/JK': 34000, 'L/BZ': 565537, 'L/VEST': 859649, 'L/SK': 842576, 'L/PT': 1765828, 'L/SPT': 146250, 'L/OP': 0, 'L/KNIT': 2934646, 'L/ACC': 806386, 'L/TTL': 10700661 },
  { week: '11/27', 'M/長袖CS': 2652377, 'M/半袖CS': 70800, 'M/JK': 0, 'M/BZ': 965745, 'M/VEST': 566050, 'M/PT': 2371809, 'M/SPT': 0, 'M/KNIT': 2795994, 'M/ACC': 1992888, 'M/TTL': 11415663, 'L/長袖CS': 1830931, 'L/半袖CS': 14400, 'L/JK': 118000, 'L/BZ': 529150, 'L/VEST': 672371, 'L/SK': 597925, 'L/PT': 1889407, 'L/SPT': 135833, 'L/OP': 0, 'L/KNIT': 1913170, 'L/ACC': 394015, 'L/TTL': 8095202 },
  { week: '12/4', 'M/長袖CS': 2775156, 'M/半袖CS': 39000, 'M/JK': 0, 'M/BZ': 1272373, 'M/VEST': 607187, 'M/PT': 1975361, 'M/SPT': 0, 'M/KNIT': 2717731, 'M/ACC': 1986743, 'M/TTL': 11373551, 'L/長袖CS': 1577864, 'L/半袖CS': 97888, 'L/JK': 0, 'L/BZ': 683026, 'L/VEST': 629631, 'L/SK': 527233, 'L/PT': 1014742, 'L/SPT': 92500, 'L/OP': 0, 'L/KNIT': 1623857, 'L/ACC': 349158, 'L/TTL': 6595899 },
  { week: '12/11', 'M/長袖CS': 2626979, 'M/半袖CS': 50799, 'M/JK': 0, 'M/BZ': 975575, 'M/VEST': 640785, 'M/PT': 1968926, 'M/SPT': 0, 'M/KNIT': 2165319, 'M/ACC': 2234126, 'M/TTL': 10662509, 'L/長袖CS': 1450921, 'L/半袖CS': 22200, 'L/JK': 53100, 'L/BZ': 517000, 'L/VEST': 571700, 'L/SK': 270100, 'L/PT': 1465405, 'L/SPT': 50000, 'L/OP': 0, 'L/KNIT': 1854807, 'L/ACC': 359726, 'L/TTL': 6614959 },
  { week: '12/18', 'M/長袖CS': 2176231, 'M/半袖CS': 0, 'M/JK': 0, 'M/BZ': 853850, 'M/VEST': 601406, 'M/PT': 1481928, 'M/SPT': 0, 'M/KNIT': 2075135, 'M/ACC': 2017553, 'M/TTL': 9206103, 'L/長袖CS': 747194, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 329356, 'L/VEST': 298090, 'L/SK': 232391, 'L/PT': 930210, 'L/SPT': 25000, 'L/OP': 0, 'L/KNIT': 981239, 'L/ACC': 366614, 'L/TTL': 3910094 },
  { week: '12/25', 'M/長袖CS': 880804, 'M/半袖CS': 41000, 'M/JK': 0, 'M/BZ': 328600, 'M/VEST': 276000, 'M/PT': 534177, 'M/SPT': 0, 'M/KNIT': 857659, 'M/ACC': 655381, 'M/TTL': 3573621, 'L/長袖CS': 431500, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 188000, 'L/VEST': 174000, 'L/SK': 110800, 'L/PT': 256000, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 444800, 'L/ACC': 146579, 'L/TTL': 1751679 },
]

const quantityData = [
  { week: '7/3', 'M/長袖CS': 6, 'M/半袖CS': 94, 'M/JK': 0, 'M/BZ': 6, 'M/VEST': 5, 'M/PT': 51, 'M/SPT': 22, 'M/KNIT': 4, 'M/ACC': 119, 'M/TTL': 308, 'L/長袖CS': 19, 'L/半袖CS': 41, 'L/JK': 2, 'L/BZ': 2, 'L/VEST': 1, 'L/SK': 20, 'L/PT': 19, 'L/SPT': 1, 'L/OP': 1, 'L/KNIT': 4, 'L/ACC': 69, 'L/TTL': 179 },
  { week: '7/10', 'M/長袖CS': 4, 'M/半袖CS': 68, 'M/JK': 0, 'M/BZ': 4, 'M/VEST': 5, 'M/PT': 24, 'M/SPT': 12, 'M/KNIT': 3, 'M/ACC': 93, 'M/TTL': 213, 'L/長袖CS': 13, 'L/半袖CS': 34, 'L/JK': 0, 'L/BZ': 3, 'L/VEST': 0, 'L/SK': 16, 'L/PT': 9, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 1, 'L/ACC': 45, 'L/TTL': 121 },
  { week: '7/17', 'M/長袖CS': 3, 'M/半袖CS': 61, 'M/JK': 0, 'M/BZ': 5, 'M/VEST': 3, 'M/PT': 20, 'M/SPT': 16, 'M/KNIT': 1, 'M/ACC': 102, 'M/TTL': 215, 'L/長袖CS': 11, 'L/半袖CS': 23, 'L/JK': 0, 'L/BZ': 1, 'L/VEST': 1, 'L/SK': 13, 'L/PT': 12, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 1, 'L/ACC': 52, 'L/TTL': 115 },
  { week: '7/24', 'M/長袖CS': 3, 'M/半袖CS': 44, 'M/JK': 0, 'M/BZ': 5, 'M/VEST': 8, 'M/PT': 11, 'M/SPT': 12, 'M/KNIT': 2, 'M/ACC': 71, 'M/TTL': 166, 'L/長袖CS': 24, 'L/半袖CS': 19, 'L/JK': 0, 'L/BZ': 1, 'L/VEST': 2, 'L/SK': 8, 'L/PT': 7, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 1, 'L/ACC': 37, 'L/TTL': 99 },
  { week: '7/31', 'M/長袖CS': 4, 'M/半袖CS': 29, 'M/JK': 0, 'M/BZ': 3, 'M/VEST': 2, 'M/PT': 18, 'M/SPT': 20, 'M/KNIT': 0, 'M/ACC': 123, 'M/TTL': 204, 'L/長袖CS': 12, 'L/半袖CS':17, 'L/JK': 0, 'L/BZ': 4, 'L/VEST': 2, 'L/SK': 3, 'L/PT': 9, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 5, 'L/ACC': 36, 'L/TTL': 89 },
  { week: '8/7', 'M/長袖CS': 3, 'M/半袖CS': 38, 'M/JK': 0, 'M/BZ': 6, 'M/VEST': 4, 'M/PT': 19, 'M/SPT': 7, 'M/KNIT': 0, 'M/ACC': 57, 'M/TTL': 142, 'L/長袖CS': 22, 'L/半袖CS': 18, 'L/JK': 0, 'L/BZ': 1, 'L/VEST': 1, 'L/SK': 7, 'L/PT': 5, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 2, 'L/ACC': 36, 'L/TTL': 93 },
  { week: '8/14', 'M/長袖CS': 2, 'M/半袖CS': 26, 'M/JK': 0, 'M/BZ': 7, 'M/VEST': 5, 'M/PT': 11, 'M/SPT': 5, 'M/KNIT': 3, 'M/ACC': 58, 'M/TTL': 121, 'L/長袖CS': 20, 'L/半袖CS': 19, 'L/JK': 0, 'L/BZ': 2, 'L/VEST': 4, 'L/SK': 8, 'L/PT': 5, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 3, 'L/ACC': 37, 'L/TTL': 98 },
  { week: '8/21', 'M/長袖CS': 4, 'M/半袖CS': 37, 'M/JK': 1, 'M/BZ': 13, 'M/VEST': 13, 'M/PT': 22, 'M/SPT': 9, 'M/KNIT': 3, 'M/ACC': 100, 'M/TTL': 227, 'L/長袖CS': 25, 'L/半袖CS': 15, 'L/JK': 1, 'L/BZ': 2, 'L/VEST': 9, 'L/SK': 14, 'L/PT': 3, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 7, 'L/ACC': 43, 'L/TTL': 119 },
  { week: '8/28', 'M/長袖CS': 9, 'M/半袖CS': 23, 'M/JK': 2, 'M/BZ': 9, 'M/VEST': 18, 'M/PT': 21, 'M/SPT': 5, 'M/KNIT': 1, 'M/ACC': 70, 'M/TTL': 171, 'L/長袖CS': 19, 'L/半袖CS': 12, 'L/JK': 2, 'L/BZ': 0, 'L/VEST': 8, 'L/SK': 11, 'L/PT': 3, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 2, 'L/ACC': 23, 'L/TTL': 80 },
  { week: '9/4', 'M/長袖CS': 10, 'M/半袖CS': 18, 'M/JK': 1, 'M/BZ': 9, 'M/VEST': 7, 'M/PT': 20, 'M/SPT': 2, 'M/KNIT': 3, 'M/ACC': 62, 'M/TTL': 153, 'L/長袖CS': 22, 'L/半袖CS': 9, 'L/JK': 6, 'L/BZ': 2, 'L/VEST': 13, 'L/SK': 14, 'L/PT': 5, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 7, 'L/ACC': 21, 'L/TTL': 100 },
  { week: '9/11', 'M/長袖CS': 15, 'M/半袖CS': 34, 'M/JK': 1, 'M/BZ': 36, 'M/VEST': 27, 'M/PT': 49, 'M/SPT': 2, 'M/KNIT': 18, 'M/ACC': 154, 'M/TTL': 418, 'L/長袖CS': 49, 'L/半袖CS': 22, 'L/JK': 2, 'L/BZ': 3, 'L/VEST': 16, 'L/SK': 19, 'L/PT': 16, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 12, 'L/ACC': 49, 'L/TTL': 191 },
  { week: '9/18', 'M/長袖CS': 29, 'M/半袖CS': 24, 'M/JK': 6, 'M/BZ': 33, 'M/VEST': 29, 'M/PT': 92, 'M/SPT': 1, 'M/KNIT': 37, 'M/ACC': 227, 'M/TTL': 588, 'L/長袖CS': 65, 'L/半袖CS': 26, 'L/JK': 7, 'L/BZ': 5, 'L/VEST': 29, 'L/SK': 32, 'L/PT': 35, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 21, 'L/ACC': 69, 'L/TTL': 291 },
  { week: '9/25', 'M/長袖CS': 14, 'M/半袖CS': 21, 'M/JK': 5, 'M/BZ': 34, 'M/VEST': 29, 'M/PT': 55, 'M/SPT': 3, 'M/KNIT': 23, 'M/ACC': 134, 'M/TTL': 372, 'L/長袖CS': 38, 'L/半袖CS': 10, 'L/JK': 1, 'L/BZ': 5, 'L/VEST': 18, 'L/SK': 13, 'L/PT': 22, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 13, 'L/ACC': 47, 'L/TTL': 167 },
  { week: '10/2', 'M/長袖CS': 33, 'M/半袖CS': 16, 'M/JK': 0, 'M/BZ': 34, 'M/VEST': 37, 'M/PT': 67, 'M/SPT': 0, 'M/KNIT': 38, 'M/ACC': 146, 'M/TTL': 455, 'L/長袖CS': 73, 'L/半袖CS': 11, 'L/JK': 6, 'L/BZ': 12, 'L/VEST': 32, 'L/SK': 26, 'L/PT': 52, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 32, 'L/ACC': 48, 'L/TTL': 295 },
  { week: '10/9', 'M/長袖CS': 74, 'M/半袖CS': 7, 'M/JK': 3, 'M/BZ': 63, 'M/VEST': 49, 'M/PT': 135, 'M/SPT': 1, 'M/KNIT': 66, 'M/ACC': 205, 'M/TTL': 713, 'L/長袖CS': 103, 'L/半袖CS': 2, 'L/JK': 7, 'L/BZ': 19, 'L/VEST': 34, 'L/SK': 36, 'L/PT': 51, 'L/SPT': 6, 'L/OP': 0, 'L/KNIT': 55, 'L/ACC': 101, 'L/TTL': 417 },
  { week: '10/16', 'M/長袖CS': 90, 'M/半袖CS': 4, 'M/JK': 4, 'M/BZ': 71, 'M/VEST': 52, 'M/PT': 104, 'M/SPT': 1, 'M/KNIT': 54, 'M/ACC': 218, 'M/TTL': 679, 'L/長袖CS': 94, 'L/半袖CS': 3, 'L/JK': 5, 'L/BZ': 17, 'L/VEST': 27, 'L/SK': 21, 'L/PT': 43, 'L/SPT': 19, 'L/OP': 0, 'L/KNIT': 44, 'L/ACC': 75, 'L/TTL': 348 },
  { week: '10/23', 'M/長袖CS': 98, 'M/半袖CS': 6, 'M/JK': 0, 'M/BZ': 43, 'M/VEST': 31, 'M/PT': 89, 'M/SPT': 0, 'M/KNIT': 63, 'M/ACC': 163, 'M/TTL': 538, 'L/長袖CS': 73, 'L/半袖CS': 2, 'L/JK': 1, 'L/BZ': 9, 'L/VEST': 22, 'L/SK': 23, 'L/PT': 34, 'L/SPT': 17, 'L/OP': 0, 'L/KNIT': 44, 'L/ACC': 57, 'L/TTL': 284 },
  { week: '10/30', 'M/長袖CS': 119, 'M/半袖CS': 7, 'M/JK': 3, 'M/BZ': 34, 'M/VEST': 38, 'M/PT': 102, 'M/SPT': 0, 'M/KNIT': 59, 'M/ACC': 184, 'M/TTL': 618, 'L/長袖CS': 89, 'L/半袖CS': 2, 'L/JK': 8, 'L/BZ': 12, 'L/VEST': 29, 'L/SK': 41, 'L/PT': 48, 'L/SPT': 15, 'L/OP': 0, 'L/KNIT': 59, 'L/ACC': 70, 'L/TTL': 374 },
  { week: '11/6', 'M/長袖CS': 88, 'M/半袖CS': 4, 'M/JK': 1, 'M/BZ': 41, 'M/VEST': 31, 'M/PT': 98, 'M/SPT': 0, 'M/KNIT': 62, 'M/ACC': 143, 'M/TTL': 503, 'L/長袖CS': 81, 'L/半袖CS': 1, 'L/JK': 2, 'L/BZ': 16, 'L/VEST': 17, 'L/SK': 32, 'L/PT': 31, 'L/SPT': 11, 'L/OP': 0, 'L/KNIT': 31, 'L/ACC': 72, 'L/TTL': 295 },
  { week: '11/13', 'M/長袖CS': 145, 'M/半袖CS': 0, 'M/JK': 2, 'M/BZ': 58, 'M/VEST': 24, 'M/PT': 108, 'M/SPT': 0, 'M/KNIT': 48, 'M/ACC': 225, 'M/TTL': 641, 'L/長袖CS': 122, 'L/半袖CS': 1, 'L/JK': 2, 'L/BZ': 30, 'L/VEST': 29, 'L/SK': 38, 'L/PT': 71, 'L/SPT': 7, 'L/OP': 0, 'L/KNIT': 55, 'L/ACC': 107, 'L/TTL': 463 },
  { week: '11/20', 'M/長袖CS': 152, 'M/半袖CS': 3, 'M/JK': 2, 'M/BZ': 63, 'M/VEST': 29, 'M/PT': 110, 'M/SPT': 0, 'M/KNIT': 126, 'M/ACC': 189, 'M/TTL': 711, 'L/長袖CS': 125, 'L/半袖CS': 0, 'L/JK': 1, 'L/BZ': 15, 'L/VEST': 28, 'L/SK': 33, 'L/PT': 62, 'L/SPT': 6, 'L/OP': 0, 'L/KNIT': 69, 'L/ACC': 130, 'L/TTL': 470 },
  { week: '11/27', 'M/長袖CS': 95, 'M/半袖CS': 4, 'M/JK': 0, 'M/BZ': 29, 'M/VEST': 18, 'M/PT': 84, 'M/SPT': 0, 'M/KNIT': 74, 'M/ACC': 220, 'M/TTL': 552, 'L/長袖CS': 89, 'L/半袖CS': 0, 'L/JK': 2, 'L/BZ': 13, 'L/VEST': 22, 'L/SK': 24, 'L/PT': 66, 'L/SPT': 6, 'L/OP': 0, 'L/KNIT': 50, 'L/ACC': 64, 'L/TTL': 337 },
  { week: '12/4', 'M/長袖CS': 107, 'M/半袖CS': 2, 'M/JK': 0, 'M/BZ': 34, 'M/VEST': 20, 'M/PT': 72, 'M/SPT': 0, 'M/KNIT': 64, 'M/ACC': 178, 'M/TTL': 497, 'L/長袖CS': 73, 'L/半袖CS': 6, 'L/JK': 0, 'L/BZ': 19, 'L/VEST': 20, 'L/SK': 20, 'L/PT': 35, 'L/SPT': 4, 'L/OP': 0, 'L/KNIT': 42, 'L/ACC': 56, 'L/TTL': 275 },
  { week: '12/11', 'M/長袖CS': 103, 'M/半袖CS': 3, 'M/JK': 0, 'M/BZ': 26, 'M/VEST': 22, 'M/PT': 70, 'M/SPT': 0, 'M/KNIT': 59, 'M/ACC': 195, 'M/TTL': 502, 'L/長袖CS': 67, 'L/半袖CS': 2, 'L/JK': 1, 'L/BZ': 12, 'L/VEST': 18, 'L/SK': 10, 'L/PT': 52, 'L/SPT': 2, 'L/OP': 0, 'L/KNIT': 46, 'L/ACC': 51, 'L/TTL': 261 },
  { week: '12/18', 'M/長袖CS': 84, 'M/半袖CS': 0, 'M/JK': 0, 'M/BZ': 24, 'M/VEST': 19, 'M/PT': 51, 'M/SPT': 0, 'M/KNIT': 55, 'M/ACC': 212, 'M/TTL': 461, 'L/長袖CS': 32, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 9, 'L/VEST': 9, 'L/SK': 10, 'L/PT': 33, 'L/SPT': 1, 'L/OP': 0, 'L/KNIT': 23, 'L/ACC': 59, 'L/TTL': 176 },
  { week: '12/25', 'M/長袖CS': 37, 'M/半袖CS': 1, 'M/JK': 0, 'M/BZ': 8, 'M/VEST': 8, 'M/PT': 18, 'M/SPT': 0, 'M/KNIT': 20, 'M/ACC': 54, 'M/TTL': 150, 'L/長袖CS': 19, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 4, 'L/VEST': 5, 'L/SK': 5, 'L/PT': 8, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 10, 'L/ACC': 20, 'L/TTL': 71 },
]

const formatYAxis = (value: number) => {
  return new Intl.NumberFormat('ja-JP').format(value)
}

const formatTooltip = (value: number) => {
  return new Intl.NumberFormat('ja-JP').format(value)
}

// 年度ごとのデータをオブジェクトに分ける
const salesData = {
  2022: {
    amountData: [
      { week: '7/4', 'M/長袖CS': 44100, 'M/半袖CS': 1499336, 'M/JK': 94720, 'M/BZ': 174236, 'M/VEST': 0, 'M/PT': 387630, 'M/SPT': 419182, 'M/KNIT': 0, 'M/ACC': 2294970, 'M/TTL': 5266974, 'L/長袖CS': 162538, 'L/半袖CS': 443513, 'L/JK': 0, 'L/BZ': 76367, 'L/VEST': 0, 'L/SK': 65339, 'L/PT': 130858, 'L/SPT': 182586, 'L/OP': 325408, 'L/KNIT': 21108, 'L/ACC': 429797, 'L/TTL': 1837514 },
      { week: '7/11', 'M/長袖CS': 9000, 'M/半袖CS': 1147477, 'M/JK': 67868, 'M/BZ': 334560, 'M/VEST': 0, 'M/PT': 256395, 'M/SPT': 249111, 'M/KNIT': 49000, 'M/ACC': 1228424, 'M/TTL': 3652256, 'L/長袖CS': 191400, 'L/半袖CS': 379594, 'L/JK': 0, 'L/BZ': 18917, 'L/VEST': 0, 'L/SK': 22753, 'L/PT': 208294, 'L/SPT': 151000, 'L/OP': 696052, 'L/KNIT': 26000, 'L/ACC': 273395, 'L/TTL': 1967405 },
      { week: '7/18', 'M/長袖CS': 27000, 'M/半袖CS': 1188676, 'M/JK': 27481, 'M/BZ': 17089, 'M/VEST': 0, 'M/PT': 119826, 'M/SPT': 316055, 'M/KNIT': 65875, 'M/ACC': 1237713, 'M/TTL': 3171327, 'L/長袖CS': 160042, 'L/半袖CS': 648544, 'L/JK': 0, 'L/BZ': 0, 'L/VEST': 0, 'L/SK': 39563, 'L/PT': 213133, 'L/SPT': 239746, 'L/OP': 127452, 'L/KNIT': 0, 'L/ACC': 312513, 'L/TTL': 1740993 },
      { week: '7/25', 'M/長袖CS': 8100, 'M/半袖CS': 788240, 'M/JK': 0, 'M/BZ': 23000, 'M/VEST': 0, 'M/PT': 154689, 'M/SPT': 444045, 'M/KNIT': 52000, 'M/ACC': 1447239, 'M/TTL': 3122513, 'L/長袖CS': 139970, 'L/半袖CS': 332644, 'L/JK': 0, 'L/BZ': 125100, 'L/VEST': 0, 'L/SK': 88930, 'L/PT': 214500, 'L/SPT': 197727, 'L/OP': 234059, 'L/KNIT': 26000, 'L/ACC': 397313, 'L/TTL': 1772243 },
      { week: '8/1', 'M/長袖CS': 0, 'M/半袖CS': 1021431, 'M/JK': 35000, 'M/BZ': 0, 'M/VEST': 0, 'M/PT': 244860, 'M/SPT': 557625, 'M/KNIT': 46850, 'M/ACC': 999432, 'M/TTL': 3182998, 'L/長袖CS': 121563, 'L/半袖CS': 296283, 'L/JK': 0, 'L/BZ': 109000, 'L/VEST': 0, 'L/SK': 89513, 'L/PT': 42500, 'L/SPT': 263205, 'L/OP': 213300, 'L/KNIT': 0, 'L/ACC': 319427, 'L/TTL': 1502791 },
      { week: '8/8', 'M/長袖CS': 36400, 'M/半袖CS': 982903, 'M/JK': 0, 'M/BZ': 89000, 'M/VEST': 0, 'M/PT': 266970, 'M/SPT': 241530, 'M/KNIT': 49500, 'M/ACC': 976729, 'M/TTL': 2956058, 'L/長袖CS': 209271, 'L/半袖CS': 408582, 'L/JK': 0, 'L/BZ': 0, 'L/VEST': 0, 'L/SK': 67530, 'L/PT': 70886, 'L/SPT': 221708, 'L/OP': 210000, 'L/KNIT': 24650, 'L/ACC': 426198, 'L/TTL': 1676825 },
      { week: '8/15', 'M/長袖CS': 64750, 'M/半袖CS': 812857, 'M/JK': 0, 'M/BZ': 57945, 'M/VEST': 0, 'M/PT': 176354, 'M/SPT': 206439, 'M/KNIT': 27250, 'M/ACC': 1016433, 'M/TTL': 2598312, 'L/長袖CS': 163585, 'L/半袖CS': 326342, 'L/JK': 0, 'L/BZ': 195885, 'L/VEST': 0, 'L/SK': 38786, 'L/PT': 20700, 'L/SPT': 94095, 'L/OP': 177737, 'L/KNIT': 0, 'L/ACC': 273965, 'L/TTL': 1332595 },
      { week: '8/22', 'M/長袖CS': 78223, 'M/半袖CS': 656775, 'M/JK': 35000, 'M/BZ': 85181, 'M/VEST': 0, 'M/PT': 431910, 'M/SPT': 104860, 'M/KNIT': 187138, 'M/ACC': 1424205, 'M/TTL': 3264842, 'L/長袖CS': 281750, 'L/半袖CS': 345623, 'L/JK': 0, 'L/BZ': 80391, 'L/VEST': 0, 'L/SK': 145300, 'L/PT': 102350, 'L/SPT': 90700, 'L/OP': 25273, 'L/KNIT': 242081, 'L/ACC': 405249, 'L/TTL': 1922717 },
      { week: '8/29', 'M/長袖CS': 258669, 'M/半袖CS': 635194, 'M/JK': 0, 'M/BZ': 253400, 'M/VEST': 0, 'M/PT': 470722, 'M/SPT': 59106, 'M/KNIT': 750416, 'M/ACC': 843598, 'M/TTL': 3532405, 'L/長袖CS': 309900, 'L/半袖CS': 281144, 'L/JK': 0, 'L/BZ': 46000, 'L/VEST': 0, 'L/SK': 386865, 'L/PT': 211690, 'L/SPT': 47500, 'L/OP': 92009, 'L/KNIT': 1111290, 'L/ACC': 373035, 'L/TTL': 2953333 },
      { week: '9/5', 'M/長袖CS': 320700, 'M/半袖CS': 771343, 'M/JK': 35000, 'M/BZ': 348900, 'M/VEST': 0, 'M/PT': 963558, 'M/SPT': 46000, 'M/KNIT': 1640596, 'M/ACC': 1388196, 'M/TTL': 5868693, 'L/長袖CS': 726708, 'L/半袖CS': 381297, 'L/JK': 0, 'L/BZ': 90827, 'L/VEST': 0, 'L/SK': 396200, 'L/PT': 283728, 'L/SPT': 48000, 'L/OP': 159000, 'L/KNIT': 2072296, 'L/ACC': 477490, 'L/TTL': 4835946 },
      { week: '9/12', 'M/長袖CS': 475948, 'M/半袖CS': 679617, 'M/JK': 0, 'M/BZ': 148477, 'M/VEST': 0, 'M/PT': 1199161, 'M/SPT': 15109, 'M/KNIT': 1713400, 'M/ACC': 1301621, 'M/TTL': 5880675, 'L/長袖CS': 803304, 'L/半袖CS': 357999, 'L/JK': 0, 'L/BZ': 330400, 'L/VEST': 0, 'L/SK': 525404, 'L/PT': 470609, 'L/SPT': 20470, 'L/OP': 127687, 'L/KNIT': 1775156, 'L/ACC': 433746, 'L/TTL': 5141440 },
      { week: '9/19', 'M/長袖CS': 1233935, 'M/半袖CS': 687849, 'M/JK': 0, 'M/BZ': 373311, 'M/VEST': 0, 'M/PT': 2694794, 'M/SPT': 46130, 'M/KNIT': 3252622, 'M/ACC': 1694440, 'M/TTL': 10674831, 'L/長袖CS': 1033416, 'L/半袖CS': 304057, 'L/JK': 0, 'L/BZ': 278239, 'L/VEST': 0, 'L/SK': 691355, 'L/PT': 1305492, 'L/SPT': 25000, 'L/OP': 55100, 'L/KNIT': 2978050, 'L/ACC': 469182, 'L/TTL': 7408984 },
      { week: '9/26', 'M/長袖CS': 1190944, 'M/半袖CS': 391224, 'M/JK': 21879, 'M/BZ': 292662, 'M/VEST': 0, 'M/PT': 2459701, 'M/SPT': 0, 'M/KNIT': 2429198, 'M/ACC': 1652664, 'M/TTL': 9079664, 'L/長袖CS': 1421219, 'L/半袖CS': 256045, 'L/JK': 0, 'L/BZ': 317560, 'L/VEST': 0, 'L/SK': 824712, 'L/PT': 1207005, 'L/SPT': 50000, 'L/OP': 53000, 'L/KNIT': 2334128, 'L/ACC': 541206, 'L/TTL': 7378098 },
      { week: '10/3', 'M/長袖CS': 1303316, 'M/半袖CS': 355000, 'M/JK': 31575, 'M/BZ': 990020, 'M/VEST': 0, 'M/PT': 3275629, 'M/SPT': 0, 'M/KNIT': 2913540, 'M/ACC': 1646218, 'M/TTL': 11579142, 'L/長袖CS': 2016304, 'L/半袖CS': 135616, 'L/JK': 0, 'L/BZ': 219150, 'L/VEST': 0, 'L/SK': 667077, 'L/PT': 1449363, 'L/SPT': 50000, 'L/OP': 147309, 'L/KNIT': 2612891, 'L/ACC': 505949, 'L/TTL': 8119159 },
      { week: '10/10', 'M/長袖CS': 1617299, 'M/半袖CS': 480964, 'M/JK': 0, 'M/BZ': 1503806, 'M/VEST': 0, 'M/PT': 3372846, 'M/SPT': 0, 'M/KNIT': 3554708, 'M/ACC': 2251858, 'M/TTL': 14391151, 'L/長袖CS': 1763727, 'L/半袖CS': 112297, 'L/JK': 0, 'L/BZ': 437714, 'L/VEST': 0, 'L/SK': 688793, 'L/PT': 1383919, 'L/SPT': 25000, 'L/OP': 103656, 'L/KNIT': 2922565, 'L/ACC': 580478, 'L/TTL': 8385649 },
      { week: '10/17', 'M/長袖CS': 1861129, 'M/半袖CS': 303844, 'M/JK': 35000, 'M/BZ': 1736386, 'M/VEST': 0, 'M/PT': 3445336, 'M/SPT': 0, 'M/KNIT': 3512131, 'M/ACC': 2180563, 'M/TTL': 14758951, 'L/長袖CS': 1985940, 'L/半袖CS': 57361, 'L/JK': 0, 'L/BZ': 407050, 'L/VEST': 0, 'L/SK': 1046430, 'L/PT': 2180489, 'L/SPT': 0, 'L/OP': 106000, 'L/KNIT': 3651751, 'L/ACC': 753672, 'L/TTL': 10877409 },
      { week: '10/24', 'M/長袖CS': 2395918, 'M/半袖CS': 153354, 'M/JK': 0, 'M/BZ': 1493557, 'M/VEST': 259000, 'M/PT': 2808657, 'M/SPT': 0, 'M/KNIT': 3485049, 'M/ACC': 1803428, 'M/TTL': 14004715, 'L/長袖CS': 2589695, 'L/半袖CS': 49750, 'L/JK': 0, 'L/BZ': 753856, 'L/VEST': 539826, 'L/SK': 746212, 'L/PT': 1626360, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 3142212, 'L/ACC': 730919, 'L/TTL': 10789899 },
      { week: '10/31', 'M/長袖CS': 2864296, 'M/半袖CS': 278216, 'M/JK': 0, 'M/BZ': 2405386, 'M/VEST': 693645, 'M/PT': 3873302, 'M/SPT': 0, 'M/KNIT': 3372779, 'M/ACC': 1923624, 'M/TTL': 17176580, 'L/長袖CS': 2785760, 'L/半袖CS': 51800, 'L/JK': 0, 'L/BZ': 806016, 'L/VEST': 1114375, 'L/SK': 1262709, 'L/PT': 1315554, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 3215533, 'L/ACC': 994583, 'L/TTL': 12022430 },
      { week: '11/7', 'M/長袖CS': 3704615, 'M/半袖CS': 160072, 'M/JK': 0, 'M/BZ': 2188308, 'M/VEST': 816291, 'M/PT': 4262840, 'M/SPT': 0, 'M/KNIT': 2735523, 'M/ACC': 1378826, 'M/TTL': 16418537, 'L/長袖CS': 2350175, 'L/半袖CS': 18000, 'L/JK': 0, 'L/BZ': 893999, 'L/VEST': 708752, 'L/SK': 927718, 'L/PT': 1197708, 'L/SPT': 0, 'L/OP': 53000, 'L/KNIT': 1846340, 'L/ACC': 808684, 'L/TTL': 9169024 },
      { week: '11/14', 'M/長袖CS': 3364142, 'M/半袖CS': 66000, 'M/JK': 0, 'M/BZ': 1859059, 'M/VEST': 879646, 'M/PT': 3596164, 'M/SPT': 0, 'M/KNIT': 2893900, 'M/ACC': 1579533, 'M/TTL': 14790982, 'L/長袖CS': 2393805, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 966265, 'L/VEST': 1192103, 'L/SK': 1082450, 'L/PT': 1433544, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 1877187, 'L/ACC': 834917, 'L/TTL': 10124671 },
      { week: '11/21', 'M/長袖CS': 2846855, 'M/半袖CS': 49300, 'M/JK': 0, 'M/BZ': 1753823, 'M/VEST': 702300, 'M/PT': 3812897, 'M/SPT': 0, 'M/KNIT': 2599602, 'M/ACC': 1125180, 'M/TTL': 13863583, 'L/長袖CS': 2353587, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 1196899, 'L/VEST': 975644, 'L/SK': 942032, 'L/PT': 2158273, 'L/SPT': 23750, 'L/OP': 0, 'L/KNIT': 2098659, 'L/ACC': 1022154, 'L/TTL': 10975231 },
      { week: '11/28', 'M/長袖CS': 2735251, 'M/半袖CS': 0, 'M/JK': 0, 'M/BZ': 1340835, 'M/VEST': 970250, 'M/PT': 2815513, 'M/SPT': 0, 'M/KNIT': 3267751, 'M/ACC': 1690753, 'M/TTL': 13245053, 'L/長袖CS': 1929669, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 728414, 'L/VEST': 813488, 'L/SK': 461550, 'L/PT': 1610468, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 2076891, 'L/ACC': 747214, 'L/TTL': 8385544 },
      { week: '12/5', 'M/長袖CS': 2067840, 'M/半袖CS': 40900, 'M/JK': 0, 'M/BZ': 1941036, 'M/VEST': 911044, 'M/PT': 2873831, 'M/SPT': 0, 'M/KNIT': 3374100, 'M/ACC': 1637647, 'M/TTL': 13352998, 'L/長袖CS': 1145756, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 613514, 'L/VEST': 1092369, 'L/SK': 481600, 'L/PT': 1301066, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 1350574, 'L/ACC': 951045, 'L/TTL': 6996824 },
      { week: '12/12', 'M/長袖CS': 2097530, 'M/半袖CS': 33000, 'M/JK': 0, 'M/BZ': 950192, 'M/VEST': 904500, 'M/PT': 2922204, 'M/SPT': 0, 'M/KNIT': 3062067, 'M/ACC': 2414726, 'M/TTL': 12787419, 'L/長袖CS': 1287116, 'L/半袖CS': 37100, 'L/JK': 0, 'L/BZ': 557044, 'L/VEST': 542023, 'L/SK': 434733, 'L/PT': 1234994, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 2087150, 'L/ACC': 895073, 'L/TTL': 7094133 },
      { week: '12/19', 'M/長袖CS': 1916040, 'M/半袖CS': 0, 'M/JK': 0, 'M/BZ': 1196300, 'M/VEST': 615760, 'M/PT': 2186310, 'M/SPT': 0, 'M/KNIT': 3247914, 'M/ACC': 3353679, 'M/TTL': 12837253, 'L/長袖CS': 1282907, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 585783, 'L/VEST': 726657, 'L/SK': 471550, 'L/PT': 1027171, 'L/SPT': 0, 'L/OP': 10900, 'L/KNIT': 1971124, 'L/ACC': 1198166, 'L/TTL': 7316258 },
      { week: '12/26', 'M/長袖CS': 1261727, 'M/半袖CS': 17000, 'M/JK': 0, 'M/BZ': 664959, 'M/VEST': 319400, 'M/PT': 987290, 'M/SPT': 0, 'M/KNIT': 1778349, 'M/ACC': 1273447, 'M/TTL': 6545772, 'L/長袖CS': 434650, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 127579, 'L/VEST': 171174, 'L/SK': 340000, 'L/PT': 383111, 'L/SPT': 0, 'L/OP': 48000, 'L/KNIT': 1235000, 'L/ACC': 540493, 'L/TTL': 3343007 },
    ],
    quantityData: [
      { week: '7/4', 'M/長袖CS': 5, 'M/半袖CS': 79, 'M/JK': 3, 'M/BZ': 4, 'M/長袖SH': 0, 'M/半袖SH': 17, 'M/VEST': 0, 'M/PT': 16, 'M/SPT': 19, 'M/KNIT': 0, 'M/ACC': 226, 'M/TTL': 369, 'L/長袖CS': 15, 'L/半袖CS': 26, 'L/JK': 0, 'L/BZ': 2, 'L/長袖SH': 0, 'L/半袖SH': 0, 'L/VEST': 0, 'L/SK': 3, 'L/PT': 9, 'L/SPT': 8, 'L/OP': 13, 'L/KNIT': 1, 'L/ACC': 82, 'L/TTL': 159 },
      { week: '7/11', 'M/長袖CS': 1, 'M/半袖CS': 62, 'M/JK': 2, 'M/BZ': 6, 'M/長袖SH': 0, 'M/半袖SH': 15, 'M/VEST': 0, 'M/PT': 13, 'M/SPT': 11, 'M/KNIT': 2, 'M/ACC': 125, 'M/TTL': 237, 'L/長袖CS': 18, 'L/半袖CS': 21, 'L/JK': 0, 'L/BZ': 1, 'L/長袖SH': 0, 'L/半袖SH': 0, 'L/VEST': 0, 'L/SK': 1, 'L/PT': 14, 'L/SPT': 7, 'L/OP': 23, 'L/KNIT': 1, 'L/ACC': 53, 'L/TTL': 139 },
      { week: '7/18', 'M/長袖CS': 3, 'M/半袖CS': 64, 'M/JK': 1, 'M/BZ': 1, 'M/長袖SH': 0, 'M/半袖SH': 9, 'M/VEST': 0, 'M/PT': 6, 'M/SPT': 15, 'M/KNIT': 3, 'M/ACC': 161, 'M/TTL': 263, 'L/長袖CS': 15, 'L/半袖CS': 36, 'L/JK': 0, 'L/BZ': 0, 'L/長袖SH': 0, 'L/半袖SH': 0, 'L/VEST': 0, 'L/SK': 2, 'L/PT': 12, 'L/SPT': 10, 'L/OP': 4, 'L/KNIT': 0, 'L/ACC': 68, 'L/TTL': 147 },
      { week: '7/25', 'M/長袖CS': 1, 'M/半袖CS': 42, 'M/JK': 0, 'M/BZ': 1, 'M/長袖SH': 0, 'M/半袖SH': 11, 'M/VEST': 0, 'M/PT': 6, 'M/SPT': 20, 'M/KNIT': 2, 'M/ACC': 156, 'M/TTL': 239, 'L/長袖CS': 13, 'L/半袖CS': 18, 'L/JK': 0, 'L/BZ': 4, 'L/長袖SH': 0, 'L/半袖SH': 1, 'L/VEST': 0, 'L/SK': 4, 'L/PT': 12, 'L/SPT': 9, 'L/OP': 9, 'L/KNIT': 1, 'L/ACC': 74, 'L/TTL': 145 },
      { week: '8/1', 'M/長袖CS': 0, 'M/半袖CS': 56, 'M/JK': 1, 'M/BZ': 0, 'M/長袖SH': 0, 'M/半袖SH': 15, 'M/VEST': 0, 'M/PT': 10, 'M/SPT': 24, 'M/KNIT': 2, 'M/ACC': 117, 'M/TTL': 225, 'L/長袖CS': 10, 'L/半袖CS': 16, 'L/JK': 0, 'L/BZ': 3, 'L/長袖SH': 0, 'L/半袖SH': 3, 'L/VEST': 0, 'L/SK': 4, 'L/PT': 4, 'L/SPT': 11, 'L/OP': 8, 'L/KNIT': 0, 'L/ACC': 66, 'L/TTL': 125 },
      { week: '8/8', 'M/長袖CS': 5, 'M/半袖CS': 52, 'M/JK': 0, 'M/BZ': 2, 'M/長袖SH': 0, 'M/半袖SH': 16, 'M/VEST': 0, 'M/PT': 11, 'M/SPT': 11, 'M/KNIT': 2, 'M/ACC': 131, 'M/TTL': 230, 'L/長袖CS': 20, 'L/半袖CS': 22, 'L/JK': 0, 'L/BZ': 0, 'L/長袖SH': 0, 'L/半袖SH': 2, 'L/VEST': 0, 'L/SK': 3, 'L/PT': 5, 'L/SPT': 10, 'L/OP': 8, 'L/KNIT': 1, 'L/ACC': 60, 'L/TTL': 131 },
      { week: '8/15', 'M/長袖CS': 4, 'M/半袖CS': 43, 'M/JK': 0, 'M/BZ': 2, 'M/長袖SH': 0, 'M/半袖SH': 14, 'M/VEST': 0, 'M/PT': 8, 'M/SPT': 9, 'M/KNIT': 1, 'M/ACC': 125, 'M/TTL': 206, 'L/長袖CS': 14, 'L/半袖CS': 18, 'L/JK': 0, 'L/BZ': 5, 'L/長袖SH': 0, 'L/半袖SH': 2, 'L/VEST': 0, 'L/SK': 2, 'L/PT': 1, 'L/SPT': 5, 'L/OP': 6, 'L/KNIT': 0, 'L/ACC': 58, 'L/TTL': 111 },
      { week: '8/22', 'M/長袖CS': 5, 'M/半袖CS': 37, 'M/JK': 1, 'M/BZ': 2, 'M/長袖SH': 5, 'M/半袖SH': 9, 'M/VEST': 0, 'M/PT': 21, 'M/SPT': 5, 'M/KNIT': 8, 'M/ACC': 122, 'M/TTL': 215, 'L/長袖CS': 20, 'L/半袖CS': 20, 'L/JK': 0, 'L/BZ': 2, 'L/長袖SH': 4, 'L/半袖SH': 8, 'L/VEST': 0, 'L/SK': 7, 'L/PT': 5, 'L/SPT': 4, 'L/OP': 1, 'L/KNIT': 10, 'L/ACC': 68, 'L/TTL': 149 },
      { week: '8/29', 'M/長袖CS': 15, 'M/半袖CS': 35, 'M/JK': 0, 'M/BZ': 7, 'M/長袖SH': 7, 'M/半袖SH': 8, 'M/VEST': 0, 'M/PT': 21, 'M/SPT': 3, 'M/KNIT': 30, 'M/ACC': 115, 'M/TTL': 241, 'L/長袖CS': 20, 'L/半袖CS': 18, 'L/JK': 0, 'L/BZ': 2, 'L/長袖SH': 2, 'L/半袖SH': 3, 'L/VEST': 0, 'L/SK': 17, 'L/PT': 11, 'L/SPT': 2, 'L/OP': 4, 'L/KNIT': 45, 'L/ACC': 64, 'L/TTL': 188 },
      { week: '9/5', 'M/長袖CS': 20, 'M/半袖CS': 47, 'M/JK': 1, 'M/BZ': 10, 'M/長袖SH': 8, 'M/半袖SH': 11, 'M/VEST': 0, 'M/PT': 43, 'M/SPT': 2, 'M/KNIT': 68, 'M/ACC': 128, 'M/TTL': 338, 'L/長袖CS': 49, 'L/半袖CS': 26, 'L/JK': 0, 'L/BZ': 3, 'L/長袖SH': 5, 'L/半袖SH': 7, 'L/VEST': 0, 'L/SK': 17, 'L/PT': 14, 'L/SPT': 2, 'L/OP': 4, 'L/KNIT': 83, 'L/ACC': 100, 'L/TTL': 310 },
      { week: '9/12', 'M/長袖CS': 27, 'M/半袖CS': 44, 'M/JK': 0, 'M/BZ': 5, 'M/長袖SH': 13, 'M/半袖SH': 5, 'M/VEST': 0, 'M/PT': 50, 'M/SPT': 1, 'M/KNIT': 69, 'M/ACC': 142, 'M/TTL': 356, 'L/長袖CS': 52, 'L/半袖CS': 25, 'L/JK': 0, 'L/BZ': 9, 'L/長袖SH': 9, 'L/半袖SH': 7, 'L/VEST': 0, 'L/SK': 22, 'L/PT': 19, 'L/SPT': 1, 'L/OP': 4, 'L/KNIT': 72, 'L/ACC': 85, 'L/TTL': 305 },
      { week: '9/19', 'M/長袖CS': 75, 'M/半袖CS': 48, 'M/JK': 0, 'M/BZ': 11, 'M/長袖SH': 26, 'M/半袖SH': 12, 'M/VEST': 0, 'M/PT': 113, 'M/SPT': 2, 'M/KNIT': 133, 'M/ACC': 192, 'M/TTL': 612, 'L/長袖CS': 64, 'L/半袖CS': 22, 'L/JK': 0, 'L/BZ': 8, 'L/長袖SH': 9, 'L/半袖SH': 7, 'L/VEST': 0, 'L/SK': 30, 'L/PT': 57, 'L/SPT': 1, 'L/OP': 2, 'L/KNIT': 119, 'L/ACC': 104, 'L/TTL': 423 },
      { week: '9/26', 'M/長袖CS': 73, 'M/半袖CS': 27, 'M/JK': 1, 'M/BZ': 7, 'M/長袖SH': 27, 'M/半袖SH': 7, 'M/VEST': 0, 'M/PT': 105, 'M/SPT': 0, 'M/KNIT': 102, 'M/ACC': 169, 'M/TTL': 518, 'L/長袖CS': 85, 'L/半袖CS': 17, 'L/JK': 0, 'L/BZ': 7, 'L/長袖SH': 12, 'L/半袖SH': 9, 'L/VEST': 0, 'L/SK': 37, 'L/PT': 52, 'L/SPT': 2, 'L/OP': 1, 'L/KNIT': 95, 'L/ACC': 95, 'L/TTL': 412 },
      { week: '10/3', 'M/長袖CS': 77, 'M/半袖CS': 23, 'M/JK': 1, 'M/BZ': 31, 'M/長袖SH': 48, 'M/半袖SH': 6, 'M/VEST': 0, 'M/PT': 136, 'M/SPT': 0, 'M/KNIT': 116, 'M/ACC': 183, 'M/TTL': 621, 'L/長袖CS': 116, 'L/半袖CS': 11, 'L/JK': 0, 'L/BZ': 5, 'L/長袖SH': 15, 'L/半袖SH': 1, 'L/VEST': 0, 'L/SK': 30, 'L/PT': 62, 'L/SPT': 2, 'L/OP': 3, 'L/KNIT': 107, 'L/ACC': 106, 'L/TTL': 458 },
      { week: '10/10', 'M/長袖CS': 89, 'M/半袖CS': 29, 'M/JK': 0, 'M/BZ': 50, 'M/長袖SH': 73, 'M/半袖SH': 9, 'M/VEST': 0, 'M/PT': 142, 'M/SPT': 0, 'M/KNIT': 141, 'M/ACC': 225, 'M/TTL': 758, 'L/長袖CS': 97, 'L/半袖CS': 8, 'L/JK': 0, 'L/BZ': 12, 'L/長袖SH': 18, 'L/半袖SH': 0, 'L/VEST': 0, 'L/SK': 29, 'L/PT': 59, 'L/SPT': 1, 'L/OP': 2, 'L/KNIT': 113, 'L/ACC': 120, 'L/TTL': 459 },
      { week: '10/17', 'M/長袖CS': 99, 'M/半袖CS': 21, 'M/JK': 1, 'M/BZ': 58, 'M/長袖SH': 77, 'M/半袖SH': 8, 'M/VEST': 0, 'M/PT': 143, 'M/SPT': 0, 'M/KNIT': 137, 'M/ACC': 235, 'M/TTL': 779, 'L/長袖CS': 107, 'L/半袖CS': 5, 'L/JK': 0, 'L/BZ': 12, 'L/長袖SH': 31, 'L/半袖SH': 4, 'L/VEST': 0, 'L/SK': 44, 'L/PT': 93, 'L/SPT': 0, 'L/OP': 2, 'L/KNIT': 143, 'L/ACC': 119, 'L/TTL': 560 },
      { week: '10/24', 'M/長袖CS': 124, 'M/半袖CS': 9, 'M/JK': 0, 'M/BZ': 47, 'M/長袖SH': 79, 'M/半袖SH': 1, 'M/VEST': 8, 'M/PT': 116, 'M/SPT': 0, 'M/KNIT': 132, 'M/ACC': 194, 'M/TTL': 710, 'L/長袖CS': 137, 'L/半袖CS': 4, 'L/JK': 0, 'L/BZ': 22, 'L/長袖SH': 30, 'L/半袖SH': 2, 'L/VEST': 17, 'L/SK': 30, 'L/PT': 68, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 123, 'L/ACC': 113, 'L/TTL': 546 },
      { week: '10/31', 'M/長袖CS': 143, 'M/半袖CS': 18, 'M/JK': 0, 'M/BZ': 78, 'M/長袖SH': 83, 'M/半袖SH': 6, 'M/VEST': 21, 'M/PT': 152, 'M/SPT': 0, 'M/KNIT': 111, 'M/ACC': 232, 'M/TTL': 844, 'L/長袖CS': 141, 'L/半袖CS': 4, 'L/JK': 0, 'L/BZ': 24, 'L/長袖SH': 21, 'L/半袖SH': 4, 'L/VEST': 34, 'L/SK': 52, 'L/PT': 55, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 114, 'L/ACC': 145, 'L/TTL': 594 },
      { week: '11/7', 'M/長袖CS': 183, 'M/半袖CS': 10, 'M/JK': 0, 'M/BZ': 70, 'M/長袖SH': 56, 'M/半袖SH': 3, 'M/VEST': 24, 'M/PT': 158, 'M/SPT': 0, 'M/KNIT': 86, 'M/ACC': 165, 'M/TTL': 755, 'L/長袖CS': 116, 'L/半袖CS': 1, 'L/JK': 0, 'L/BZ': 25, 'L/長袖SH': 17, 'L/半袖SH': 2, 'L/VEST': 21, 'L/SK': 38, 'L/PT': 46, 'L/SPT': 0, 'L/OP': 1, 'L/KNIT': 63, 'L/ACC': 114, 'L/TTL': 444 },
      { week: '11/14', 'M/長袖CS': 166, 'M/半袖CS': 4, 'M/JK': 0, 'M/BZ': 58, 'M/長袖SH': 26, 'M/半袖SH': 2, 'M/VEST': 27, 'M/PT': 129, 'M/SPT': 0, 'M/KNIT': 93, 'M/ACC': 177, 'M/TTL': 682, 'L/長袖CS': 119, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 28, 'L/長袖SH': 17, 'L/半袖SH': 0, 'L/VEST': 37, 'L/SK': 44, 'L/PT': 54, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 62, 'L/ACC': 115, 'L/TTL': 476 },
      { week: '11/21', 'M/長袖CS': 141, 'M/半袖CS': 3, 'M/JK': 0, 'M/BZ': 53, 'M/長袖SH': 50, 'M/半袖SH': 0, 'M/VEST': 21, 'M/PT': 139, 'M/SPT': 0, 'M/KNIT': 83, 'M/ACC': 167, 'M/TTL': 657, 'L/長袖CS': 120, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 34, 'L/長袖SH': 10, 'L/半袖SH': 0, 'L/VEST': 31, 'L/SK': 38, 'L/PT': 85, 'L/SPT': 1, 'L/OP': 0, 'L/KNIT': 71, 'L/ACC': 135, 'L/TTL': 525 },
      { week: '11/28', 'M/長袖CS': 136, 'M/半袖CS': 0, 'M/JK': 0, 'M/BZ': 42, 'M/長袖SH': 22, 'M/半袖SH': 0, 'M/VEST': 29, 'M/PT': 105, 'M/SPT': 0, 'M/KNIT': 96, 'M/ACC': 156, 'M/TTL': 586, 'L/長袖CS': 100, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 21, 'L/長袖SH': 1, 'L/半袖SH': 0, 'L/VEST': 27, 'L/SK': 19, 'L/PT': 61, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 60, 'L/ACC': 111, 'L/TTL': 400 },
      { week: '12/5', 'M/長袖CS': 100, 'M/半袖CS': 3, 'M/JK': 0, 'M/BZ': 57, 'M/長袖SH': 23, 'M/半袖SH': 2, 'M/VEST': 26, 'M/PT': 102, 'M/SPT': 0, 'M/KNIT': 98, 'M/ACC': 209, 'M/TTL': 620, 'L/長袖CS': 57, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 16, 'L/長袖SH': 3, 'L/半袖SH': 0, 'L/VEST': 34, 'L/SK': 18, 'L/PT': 48, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 41, 'L/ACC': 123, 'L/TTL': 340 },
      { week: '12/12', 'M/長袖CS': 100, 'M/半袖CS': 2, 'M/JK': 0, 'M/BZ': 26, 'M/長袖SH': 20, 'M/半袖SH': 0, 'M/VEST': 27, 'M/PT': 105, 'M/SPT': 0, 'M/KNIT': 88, 'M/ACC': 257, 'M/TTL': 625, 'L/長袖CS': 67, 'L/半袖CS': 2, 'L/JK': 0, 'L/BZ': 13, 'L/長袖SH': 1, 'L/半袖SH': 0, 'L/VEST': 17, 'L/SK': 17, 'L/PT': 45, 'L/SPT': 0, 'L/OP': 0, 'L/KNIT': 58, 'L/ACC': 127, 'L/TTL': 347 },
      { week: '12/19', 'M/長袖CS': 90, 'M/半袖CS': 0, 'M/JK': 0, 'M/BZ': 31, 'M/長袖SH': 15, 'M/半袖SH': 1, 'M/VEST': 18, 'M/PT': 75, 'M/SPT': 0, 'M/KNIT': 85, 'M/ACC': 330, 'M/TTL': 645, 'L/長袖CS': 61, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 13, 'L/長袖SH': 2, 'L/半袖SH': 0, 'L/VEST': 22, 'L/SK': 18, 'L/PT': 36, 'L/SPT': 0, 'L/OP': 1, 'L/KNIT': 53, 'L/ACC': 145, 'L/TTL': 351 },
      { week: '12/26', 'M/長袖CS': 61, 'M/半袖CS': 1, 'M/JK': 0, 'M/BZ': 18, 'M/長袖SH': 12, 'M/半袖SH': 0, 'M/VEST': 9, 'M/PT': 34, 'M/SPT': 0, 'M/KNIT': 47, 'M/ACC': 126, 'M/TTL': 308, 'L/長袖CS': 21, 'L/半袖CS': 0, 'L/JK': 0, 'L/BZ': 4, 'L/長袖SH': 3, 'L/半袖SH': 0, 'L/VEST': 5, 'L/SK': 13, 'L/PT': 14, 'L/SPT': 0, 'L/OP': 1, 'L/KNIT': 32, 'L/ACC': 70, 'L/TTL': 163 },// 2022年のデータをここに追加
    ],
  },
  2023: {
    amountData,
    quantityData,
  },
  2024: {
    amountData: [
      // 2024年のデータをここに追加
    ],
    quantityData: [
      // 2024年のデータをここに追加
    ],
  },
}

export function WeeklySalesTrendChartComponent() {
  const [visibleLines, setVisibleLines] = useState({
    'M/TTL': true,
    'L/TTL': true,
    'M/長袖CS': false,
    'M/半袖CS': false,
    'M/JK': false,
    'M/BZ': false,
    'M/VEST': false,
    'M/PT': false,
    'M/SPT': false,
    'M/KNIT': false,
    'M/ACC': false,
    'L/長袖CS': false,
    'L/半袖CS': false,
    'L/JK': false,
    'L/BZ': false,
    'L/VEST': false,
    'L/SK': false,
    'L/PT': false,
    'L/SPT': false,
    'L/OP': false,
    'L/KNIT': false,
    'L/ACC': false,
  })
  const [category, setCategory] = useState('all')
  const [showAmount, setShowAmount] = useState(true)
  const [year, setYear] = useState(2023) // デフォルトを2023年に設定

  const toggleLine = (dataKey: string) => {
    setVisibleLines(prevState => ({
      ...prevState,
      [dataKey]: !prevState[dataKey as keyof typeof prevState]
    }))
  }

  const lineColors = {
    'M/TTL': '#8884d8',
    'L/TTL': '#82ca9d',
    'M/長袖CS': '#0088FE',
    'M/半袖CS': '#00C49F',
    'M/JK': '#FFBB28',
    'M/BZ': '#FF8042',
    'M/VEST': '#a4de6c',
    'M/PT': '#d0ed57',
    'M/SPT': '#8dd1e1',
    'M/KNIT': '#ffc658',
    'M/ACC': '#ff7300',
    'L/長袖CS': '#ff0000',
    'L/半袖CS': '#ff00ff',
    'L/JK': '#00ff00',
    'L/BZ': '#0000ff',
    'L/VEST': '#ffff00',
    'L/SK': '#00ffff',
    'L/PT': '#ff1493',
    'L/SPT': '#00bfff',
    'L/OP': '#ff4500',
    'L/KNIT': '#32cd32',
    'L/ACC': '#ff69b4',
  }

  const getVisibleLines = () => {
    if (category === 'all') return visibleLines
    return Object.keys(visibleLines).reduce((acc: { [key: string]: boolean }, key) => {
      if (key.startsWith(category) || key === 'M/TTL' || key === 'L/TTL') {
        acc[key] = visibleLines[key as keyof typeof visibleLines]
      }
      return acc
    }, {})
  }

  const keys = Object.keys(visibleLines) as Array<keyof typeof visibleLines>;

  // ラベルのマッピング（オプション）
  const labelMapping: { [key: string]: string } = {
    'M/TTL': 'メンズ トータル',
    'L/TTL': 'レディース トータル',
    'M/長袖CS': 'メンズ 長袖CS',
    'M/半袖CS': 'メンズ 半袖CS',
    'M/JK': 'メンズ JK',
    'M/BZ': 'メンズ BZ',
    'M/VEST': 'メンズ VEST',
    'M/PT': 'メンズ PT',
    'M/SPT': 'メンズ SPT',
    'M/KNIT': 'メンズ KNIT',
    'M/ACC': 'メンズ ACC',
    'L/長袖CS': 'レディース 長袖CS',
    'L/半袖CS': 'レディース 半袖CS',
    'L/JK': 'レディース JK',
    'L/BZ': 'レディース BZ',
    'L/VEST': 'レディース VEST',
    'L/SK': 'レディース SK',
    'L/PT': 'レディース PT',
    'L/SPT': 'レディース SPT',
    'L/OP': 'レディース OP',
    'L/KNIT': 'レディース KNIT',
    'L/ACC': 'レディース ACC',
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>週次売上トレンド</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="space-x-2">
            <Select value={year.toString()} onValueChange={(value) => setYear(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="年度を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022年</SelectItem>
                <SelectItem value="2023">2023年</SelectItem>
                <SelectItem value="2024">2024年</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="カテゴリーを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="M/">メンズ</SelectItem>
                <SelectItem value="L/">レディース</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="amount-switch"
              checked={showAmount}
              onCheckedChange={setShowAmount}
            />
            <Label htmlFor="amount-switch">
              {showAmount ? '金額' : '枚数'}
            </Label>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {keys.map((key) => (
            <Button
              key={key}
              variant={visibleLines[key] ? "default" : "outline"}
              onClick={() => toggleLine(key)}
              className="mb-2"
            >
              {labelMapping[key] || key}
            </Button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={showAmount ? salesData[year as keyof typeof salesData].amountData : salesData[year as keyof typeof salesData].quantityData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            {Object.keys(getVisibleLines()).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={lineColors[key as keyof typeof lineColors]}
                activeDot={{ r: 8 }}
                strokeWidth={key === 'M/TTL' || key === 'L/TTL' ? 2 : 1}
                hide={!visibleLines[key as keyof typeof visibleLines]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}