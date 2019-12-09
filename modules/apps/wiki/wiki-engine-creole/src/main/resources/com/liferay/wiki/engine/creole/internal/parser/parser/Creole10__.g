lexer grammar Creole10;
options {
  language=Java;

}
@header {
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

 package com.liferay.wiki.engine.creole.internal.parser.parser;
}

T44 : ':' ;
T45 : 'C' ;
T46 : '2' ;
T47 : 'D' ;
T48 : 'o' ;
T49 : 'k' ;
T50 : 'u' ;
T51 : 'W' ;
T52 : 'i' ;
T53 : 'F' ;
T54 : 'l' ;
T55 : 'c' ;
T56 : 'r' ;
T57 : 'G' ;
T58 : 'g' ;
T59 : 'e' ;
T60 : 'J' ;
T61 : 'S' ;
T62 : 'P' ;
T63 : 'M' ;
T64 : 'a' ;
T65 : 't' ;
T66 : 'b' ;
T67 : 'd' ;
T68 : 'n' ;
T69 : 'O' ;
T70 : 'm' ;
T71 : 's' ;
T72 : 'h' ;
T73 : 'p' ;
T74 : 'R' ;
T75 : 'x' ;
T76 : 'T' ;
T77 : 'y' ;
T78 : 'U' ;
T79 : 'X' ;
T80 : '<<TableOfContents>>' ;
T81 : '<<TableOfContents title=' ;
T82 : '\"' ;
T83 : '>>' ;

// $ANTLR src "Creole10.g" 1164
ESCAPE					: '~';
// $ANTLR src "Creole10.g" 1165
NOWIKI_BLOCK_CLOSE		: NEWLINE  '}}}';
// $ANTLR src "Creole10.g" 1166
NEWLINE					: ( CR )?  LF
						| CR;
// $ANTLR src "Creole10.g" 1168
fragment CR				: '\r';
// $ANTLR src "Creole10.g" 1169
fragment LF				: '\n';

// $ANTLR src "Creole10.g" 1171
BLANKS					: ( SPACE | TABULATOR )+;
// $ANTLR src "Creole10.g" 1172
fragment SPACE			: ' ';
// $ANTLR src "Creole10.g" 1173
fragment TABULATOR		: '\t';

// $ANTLR src "Creole10.g" 1175
BRACE_CLOSE				: NEWLINE '}';
// $ANTLR src "Creole10.g" 1176
COLON_SLASH				: ':'  '/';
// $ANTLR src "Creole10.g" 1177
ITAL					: '//';
// $ANTLR src "Creole10.g" 1178
NOWIKI_OPEN				: '{{{';
// $ANTLR src "Creole10.g" 1179
NOWIKI_CLOSE			: '}}}';
// $ANTLR src "Creole10.g" 1180
ESCAPED_BRACKET			: ESCAPE ']' {setText("]");};
// $ANTLR src "Creole10.g" 1181
LINK_OPEN				: '[[';
// $ANTLR src "Creole10.g" 1182
LINK_CLOSE				: ']]';
// $ANTLR src "Creole10.g" 1183
IMAGE_OPEN				: '{{';
// $ANTLR src "Creole10.g" 1184
IMAGE_CLOSE				: '}}';
// $ANTLR src "Creole10.g" 1185
FORCED_LINEBREAK		: '\\\\';
// $ANTLR src "Creole10.g" 1186
EQUAL					: '=';
// $ANTLR src "Creole10.g" 1187
PIPE					: '|';
// $ANTLR src "Creole10.g" 1188
POUND					: '#';
// $ANTLR src "Creole10.g" 1189
DASH					: '-';
// $ANTLR src "Creole10.g" 1190
STAR					: '*';
// $ANTLR src "Creole10.g" 1191
SLASH					: '/';
// $ANTLR src "Creole10.g" 1192
EXTENSION				: '@@';
// $ANTLR src "Creole10.g" 1193
IFRAME					: '$$';
// $ANTLR src "Creole10.g" 1194
DOUBLE_LESS_THAN		: '<<';

// $ANTLR src "Creole10.g" 1196
INSIGNIFICANT_CHAR		: .;