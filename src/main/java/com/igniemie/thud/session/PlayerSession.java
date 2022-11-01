package com.igniemie.thud.session;

import com.igniemie.thud.model.Player;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Getter
@Setter
@Component
@SessionScope
public class PlayerSession {

    private Player player;

    public boolean isLogged() {
        return this.player != null;
    }
}
