import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import {
    Group,
    ContentCard,
    CardGrid,
    Div,
    Title,
    Text,
    Card,
    Button,
} from '@vkontakte/vkui';

class TeammatesGuide extends React.Component {
    render() {
        let {id, go} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader separator={false} left={<PanelHeaderBack onClick={go} data-to="Teammates"/>} >
                    Гайд
                </PanelHeader>
                <Div>
                    <Card>
                        <Div>
                            <Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Зачем нужен раздел "Поиск напарника"?</Title>
                            <Text weight="regular">Не секрет, что каждому из нас иногда хочется поиграть в команде, найти свою покет-мерси, вместе поднять (или слить, конечно) рейтинг. Именно для этих целей создан этот раздел. Как работать с ним расскажем чуть позже.</Text>
                        </Div>
                    </Card>
                </Div>
                <Group>
                    <CardGrid size="l">
                        <ContentCard
                            subtitle="СВЯЗЬ С ACTIVISION BLIZZARD"
                            disabled
                            header="Информация про приложение"
                            text="Overwatch Hub не является официальным приложением и никаким образом не связан с Activision Blizzard."
                            maxheight={200}
                        />
                        <ContentCard
                            subtitle="ИНФОРМАЦИЯ ПРО СПИСОК АРКАД"
                            disabled
                            header="Список аркад"
                            text="Список аркад в истории обновляется ежедневно в 07:00 по МСК."
                            maxheight={200}
                        />
                        <ContentCard
                            subtitle="ИНФОРМАЦИЯ ПРО РАССЫЛКУ"
                            disabled
                            header="Рассылка"
                            text="При активации функции 'Рассылка с аркадами' мы добавляем ваш аккаунт в список ежедневной автоматизированной рассылки. Чтобы отписаться от нее, переключите тумблер или откройте сообщения с нашим сообществом, где будет кнопка 'Отключить уведомления'."
                            maxheight={200}
                        />
                        <ContentCard
                            subtitle="ИНФОРМАЦИЯ ПРО ПРИЛОЖЕНИЕ"
                            disabled
                            header="Приложение"
                            text="Текущая версия приложения: 1.2.0. Разработчик: Никита Балин"
                            maxheight={200}
                        />
                    </CardGrid>
                    <Div>
                        <Button size="l" onClick={go} data-to="teammates" stretched mode="secondary">Окей, понятно!</Button>
                    </Div>
                </Group>
            </Panel>
        )
    }
}

export default TeammatesGuide;